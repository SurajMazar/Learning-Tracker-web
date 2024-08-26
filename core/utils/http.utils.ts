import { FetchQueryOptions } from 'react-query'
import httpBase from './axios.utils'
import { AxiosRequestConfig } from 'axios'
import { filterParams, setFormData } from './helper.utils'
import { message } from 'antd'

class Http {
    /**
     * GET REQUEST
     * @param url
     * @param params
     * @param responseHeader
     * @param additionalParams
     * @param additionalHeaders
     * @param additionalAxiosOptions
     */
    public async get(
        url: string,
        params: FetchQueryOptions | null = null,
        additionalParams: Record<string, unknown> = {},
        responseHeader = false,
        additionalHeaders: Record<string, string> | undefined = undefined,
        additionalAxiosOptions: AxiosRequestConfig = {}
    ) {
        params = filterParams(
            params && params?.queryKey
                ? { ...(params.queryKey[0] as Record<string, any>) }
                : {}
        )

        return await httpBase(
            responseHeader,
            additionalAxiosOptions,
            additionalHeaders
        ).get(url, {
            params: {
                ...params,
                ...additionalParams
            }
        })
    }

    /**
     * POST REQUEST
     * @param url
     * @param data
     * @param responseHeader
     * @param additionalHeaders
     * @param additionalAxiosOptions
     */
    public async post<T extends Record<string, any>>(
        url: string,
        data: T,
        responseHeader = false,
        additionalHeaders: Record<string, string> | undefined = undefined,
        additionalAxiosOptions: AxiosRequestConfig = {}
    ) {
        const formData = setFormData(filterParams(data))
        return await httpBase(
            responseHeader,
            additionalAxiosOptions,
            additionalHeaders
        ).post(url, formData)
    }

    /**
     * PUT REQUEST
     * @param url
     * @param data
     * @param responseHeader
     * @param additionalHeaders
     * @param additionalAxiosOptions
     */
    public async put<T extends Record<string, any>>(
        url: string,
        data: T,
        responseHeader = false,
        additionalHeaders: Record<string, string> | undefined = undefined,
        additionalAxiosOptions: AxiosRequestConfig = {}
    ) {
        /** Method override */
        data = {
            ...data,
            _method: 'put'
        }
        const formData = setFormData(filterParams(data))
        return await httpBase(
            responseHeader,
            additionalAxiosOptions,
            additionalHeaders
        ).post(`${url}`, formData)
    }

    /**
     * PATCH REQUEST
     * @param url
     * @param data
     * @param responseHeader
     * @param additionalHeaders
     * @param additionalAxiosOptions
     */
    public async patch<T extends Record<string, any>>(
        url: string,
        data: T,
        responseHeader = false,
        additionalHeaders: Record<string, string> | undefined = undefined,
        additionalAxiosOptions: AxiosRequestConfig = {}
    ) {
        /** Method override */
        data = {
            ...data,
            _method: 'patch'
        }
        const formData = setFormData(filterParams(data))
        return await httpBase(
            responseHeader,
            additionalAxiosOptions,
            additionalHeaders
        ).post(`${url}`, formData)
    }

    /**
     * DELETE REQUEST
     * @param url
     * @param responseHeader
     * @param additionalHeaders
     * @param additionalAxiosOptions
     */
    public async delete(
        url: string,
        responseHeader = false,
        additionalHeaders: Record<string, string> | undefined = undefined,
        additionalAxiosOptions: AxiosRequestConfig = {}
    ) {
        return await httpBase(
            responseHeader,
            additionalAxiosOptions,
            additionalHeaders
        ).delete(`${url}`)
    }
}

/**
 *
 * @param exception
 * @param notify
 * @param errorMessage
 */
export const handleError = (
    exception: any,
    notify = false,
    errorMessage = ''
) => {
    if (exception && exception.response && exception.response.data) {
        const error = exception.response.data
        if (error.errors && Object.keys(error.errors).length) {
            Object.keys(error.errors).forEach((key) => {
                if (notify) message.error(error.errors[key][0])
            })
            return error.errors
        } else if (error.message) {
            if (notify) message.error(error.message)
            return error.message
        }
    } else {
        if (notify) message.error(errorMessage || 'Something went wrong')
        return 'Something went wrong'
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Http()
