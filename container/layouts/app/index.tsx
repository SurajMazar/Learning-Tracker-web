import React, {PropsWithChildren} from 'react'
import AuthProtected from "@/container/hoc/AuthProtected";
import AppHeader from "@/container/layouts/app/components/header";
import {Layout} from "antd";

const AppLayout: React.FC<PropsWithChildren> = (props) => {

    /**
     * COMPONENT PROPS
     */
    const {children} = props

    return (
        <>
            <AuthProtected>
                <AppHeader/>
                <Layout.Content
                    className={'max-w-[1200px] m-auto p-6'}>
                    {children}
                </Layout.Content>
            </AuthProtected>
        </>
    )
}

export default AppLayout
