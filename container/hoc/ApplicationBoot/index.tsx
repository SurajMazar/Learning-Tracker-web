import AuthSlice from '@/core/store/slice/auth.slice'
import APP_CONFIG from '@/settings/config/app.config'
import { isClient } from '@/core/utils/helper.utils'
import { getLocalStorage } from '@/core/utils/localstorage.utils'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const ApplicationBoot: React.FC<PropsWithChildren<{}>> = (props) => {
    /**
     * COMPONENT PROPS
     */
    const { children } = props

    /**
     * COMPONENT STATE
     */
    const [booted, setBooted] = useState<boolean>(false)

    /**
     * USE DISPATCH HOOK
     */
    const dispatch = useDispatch()

    /**
     * INITIALIZATION
     */
    const init = async () => {
        if (isClient()) {
            const token = await getLocalStorage(APP_CONFIG.auth_token)
            if (token) dispatch(AuthSlice.actions.setToken(token))
        }
        setBooted(true)
    }

    /**
     * MOUNTED HOOK -- BEFORE DOME INITIALIZATION
     */
    useEffect(() => {
        init()
    }, [])

    return <>{booted ? children : ''}</>
}

export default ApplicationBoot
