import { Spin } from 'antd'
import React, { useEffect, useRef } from 'react'

const ScrollPagination: React.FC<{
    callback: () => any
    loading: boolean
}> = (props) => {
    /**
     * COMPONENT PROPS
     */
    const { callback, loading } = props

    const paginationElement = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    callback()
                }
            },
            { threshold: 0 }
        )
        if (paginationElement && paginationElement.current) {
            observer.observe(paginationElement.current)
        }
        return () => {
            if (paginationElement?.current) {
                observer.unobserve(paginationElement?.current)
            }
        }
    }, [paginationElement, callback]) //eslint-disable-line

    return (
        <>
            {!loading ? (
                <div ref={paginationElement}></div>
            ) : (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '1.5em'
                    }}
                >
                    <Spin />
                </div>
            )}
        </>
    )
}

export default ScrollPagination
