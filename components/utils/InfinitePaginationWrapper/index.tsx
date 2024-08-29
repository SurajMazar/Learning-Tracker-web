import React, {forwardRef, useCallback, useImperativeHandle, useState,} from 'react'
import {Card} from 'antd'
import {useQuery} from 'react-query'
import useArrayObj from '@/core/hooks/useArray'
import {PageMetaModel} from '@/@types/model/page-meta'
import {InfiniteScrollPaginatorWrapperInterface} from '@/@types/components'
import useComputed from '@/core/hooks/useComputed'
import ScrollPagination from '@/components/utils/ScrollPagination'

const InfinitePaginationWrapper = forwardRef(
    (props: InfiniteScrollPaginatorWrapperInterface, ref: React.ForwardedRef<unknown>) => {
        /**
         * COMPONENT PROPS
         */
        const {
            iterator,
            fetchData,
            no_wrapper,
            title,
            filters,
            paginatorKey,
            per_page,
            postfix,
            prefix
        } = props
        const [page, setPage] = useState<number>(1)

        /**
         * HOOKS
         */
        const {setData, data, update} = useArrayObj<any>([])
        const [meta, setMeta] = useState<PageMetaModel | undefined>()

        /**
         * FETCHING DATA
         */
        const {isLoading, isFetching} = useQuery(
            [
                {
                    page,
                    per_page,
                    ...filters
                },
                `${paginatorKey || ''}`
            ],
            fetchData,
            {
                onSuccess(results) {
                    if (results) {
                        setData((data) => {
                            return [...data, ...results?.data]
                        })
                        setMeta(results.meta)
                    }
                }
            }
        )


        /**
         *  HAS MORE PAGE
         */
        const has_more = useComputed(() => {
            if (meta && meta?.current_page && meta?.last_page) {
                return meta?.current_page !== meta?.last_page
            }
            return false
        }, [meta, isLoading])

        /**
         * PASS EVENTS TO PARENT
         */
        useImperativeHandle(ref, () => {
            return {
                data() {
                    return data
                },
                update(data: any, key: string) {
                    update(data, key)
                }
            }
        })

        /**
         * RENDERER
         */
        const renderer = (
            <div className={'flex flex-col justify-between'}>
                {prefix ? prefix : ''}
                {iterator(data || [], has_more, isFetching)}
                {!has_more && !isLoading && postfix ? postfix : ''}
            </div>
        )

        /**
         * MEMORIZED CALLBACK FOR SCROLL PAGINATION
         */
        const memorizedCallback = useCallback(() => {
            if (meta) {
                setPage(meta?.current_page + 1)
            }
        }, [meta])

        return (
            <>
                {no_wrapper ? (
                    renderer
                ) : (
                    <Card title={title} className={'bg-white h-full relative'}>
                        {renderer}
                    </Card>
                )}

                {has_more && meta ? (
                    <ScrollPagination
                        loading={isLoading}
                        callback={memorizedCallback}
                    />
                ) : (
                    ''
                )}
            </>
        )
    }
)

InfinitePaginationWrapper.displayName = 'InfinitePaginatorWrapper'
export default InfinitePaginationWrapper
