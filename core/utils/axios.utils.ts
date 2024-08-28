import axios, {AxiosRequestConfig} from 'axios'
import {getLocalStorage} from './localstorage.utils'
import AppConfig from '@/settings/config/app.config'
import store from "@/core/store/store";
import authSlice from "@/core/store/slice/auth.slice";
import {message} from "antd";
import router from "next/router";

/**
 * AXIOS WRAPPER
 * @param includeHeader
 * @param additionalConfig
 * @param additionalHeader
 */
const httpBase = (
    includeHeader = false,
    additionalConfig: AxiosRequestConfig<any> = {},
    additionalHeader: Record<string, string> | undefined = undefined
) => {
    /**
     * AUTH TOKEN
     */
    const token = store.getState().auth.token

    /**
     * AXIOS INSTANCE
     */
    const defaultHeaders = {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        'authorization': `Bearer ${token}`,
    }

    const instance = axios.create({
        baseURL: `${AppConfig.api_url}/api/`,
        headers: additionalHeader
            ? {...defaultHeaders, ...additionalHeader}
            : defaultHeaders,
        ...additionalConfig
    })

    /**
     * RESPONSE INTERCEPTORS
     */
    instance.interceptors.response.use(
        // Success response interceptors
        (response) => {
            if (includeHeader) {
                return response
            }
            return response.data
        },
        // Error response interceptors
        async (error) => {
            const statusCode = error?.response?.status

            // UNAUTHORIZED
            if (statusCode === 401) {
                const token = await getLocalStorage(AppConfig.auth_token)
                if (token) {
                    localStorage.clear()
                    store.dispatch(authSlice.actions.reset())
                    message.error('Session expired !')
                }
            } else if (statusCode === 404) {
                await router.push('/404', '/404', {
                    shallow: false
                })
            } else if (statusCode === 403) {
                await router.push('/403', '/403', {
                    shallow: false
                })
            }
            return Promise.reject(error)
        }
    )

    return instance
}

export default httpBase
