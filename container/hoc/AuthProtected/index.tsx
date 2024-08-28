import React, {PropsWithChildren, useEffect, useState} from 'react'
import useAuth from "@/core/hooks/useAuth";
import router from "next/router";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

const AuthProtected: React.FC<PropsWithChildren> = (props) => {

    /**
     * COMPONENT PROPS
     */
    const {children} = props

    /**
     * HOOKS
     */
    const {auth, fetchAuthUser} = useAuth()
    const {authenticated, authUser} = auth

    /**
     * APPLICATION STATE
     */
    const [booted, setBooted] = useState(false)

    /**
     * INITIAL
     */
    const init = async () => {
        if (!authenticated) {
            await router.push('/login')
            return
        }else if (!authUser) {
            await fetchAuthUser()
        }
    }

    useEffect(() => {
        init().finally(() => {
            setBooted(true)
        })
    }, [authenticated])

    return (
        <>
            {
                !booted ? <>
                    <section className={'h-screen flex justify-center items-center'}>
                        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
                    </section>
                </> : children
            }
        </>
    )
}

export default AuthProtected
