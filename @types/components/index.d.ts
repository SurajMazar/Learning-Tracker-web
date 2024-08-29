import {PageMetaModel} from "@/@types/model/page-meta";
import {FetchQueryOptions} from "react-query";
import React from "react";

export interface InfiniteScrollPaginatorWrapperInterface<T = any>{
    fetchData: (
        params: FetchQueryOptions,
        additional: any = undefined
    ) => Promise<{ data: Array<T>; meta: PageMetaModel }>
    iterator: (
        data: Array<T>,
        hasMore: boolean,
        loading: boolean
    ) => React.ReactElement
    filters?: any
    key?: string
    title?: string | React.ReactElement
    per_page: number
    paginatorKey: string
    no_wrapper?: boolean
    prefix?: React.ReactElement
    postfix?: React.ReactElement
}
