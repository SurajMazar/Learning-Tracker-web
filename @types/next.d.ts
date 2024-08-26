import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { LayoutTypeKeyInterface } from '@/@types/containers/layout/layout'

/**
 * REDEFINING NEXT PAGE INTERFACE
 */
export type CustomNextPage<T = any> = NextPage<T> & {
    layout?: LayoutTypeKeyInterface
}

/**
 * REDEFINING APP PROPS INTERFACE
 */
export type CustomAppProps = AppProps & {
    Component: CustomNextPage
}
