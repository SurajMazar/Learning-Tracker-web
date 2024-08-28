import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { ApplicationLayoutProps } from '@/@types/containers/layout/layout'
import LayoutTypes, {NO_LAYOUT} from '@/settings/config/layout.config'
import APP_CONFIG from '@/settings/config/app.config'

const ApplicationLayout: React.FC<PropsWithChildren<ApplicationLayoutProps>> = (
    props
) => {
    /** COMPONENT PROPS */
    const { children, layoutType } = props

    /**
     * APP CONFIG
     */
    const { default_layout } = APP_CONFIG

    /** PLAIN LAYOUT -- NO LAYOUT */
    const Plain = <>{children}</>

    /** HIGHER PRIORITY -- IF COMPONENT HAS NONE LAYOUT */
    if (layoutType === NO_LAYOUT) {
        return Plain
    }

    /** COMPONENT HAS LAYOUT */
    if (layoutType) {
        const { component: Layout } = LayoutTypes[layoutType]
        return <Layout>{children}</Layout>
    } else if (default_layout && default_layout !== NO_LAYOUT) {
        /** IF COMPONENT DOESNT HAVE LAYOUT WE CHECK FOR DEFAULTS -- LEAST PRIORITY*/
        const { component: Layout } = LayoutTypes[default_layout]
        return <Layout>{children}</Layout>
    }

    return Plain
}

export default ApplicationLayout
