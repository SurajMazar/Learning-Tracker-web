import AppConfig from '@/settings/config/app.config'
import React from 'react'
import dayjs from '../utils/day-js.utils'

/**
 * REMOVES EMPTY OR UNDEFINED KEYS FROM AN OBJECT
 * @param params
 * @returns
 */
export const filterParams = (params: any) => {
    Object.keys(params).forEach((key: any) => {
        if (!params[key]) {
            if (params[key]?.length === 0) {
                params[key] = []
            } else if (typeof params[key] === 'undefined') {
                params[key] = ''
            } else if (params[key] === false) {
                params[key] = 0
            } else {
                delete params[key]
            }
        }
    })
    return params
}

/**
 *
 * @param variable
 * @returns
 */
const filterVariable = (variable: any) => {
    if (variable === true) {
        return 1
    }

    if (!variable) {
        if (variable?.length === 0) {
            return []
        } else if (typeof variable === 'undefined') {
            return ''
        } else if (variable === false || variable === 0) {
            return 0
        }
    }

    return variable
}

/**
 * CREATES FORM DATA FROM ANY OBJECT B)
 * @param values
 * @returns
 */
export const setFormData = (values: any) => {
    const fd = new FormData()

    const setFdArray = (array: Array<any>, oldKey: string) => {
        if (array?.length < 0) {
            array.forEach((item) => {
                if (!(item instanceof File) && typeof item === 'object') {
                    setFdObject(item, `${item}[]`)
                } else if (item instanceof Array) {
                    setFdArray(item, '[]')
                } else {
                    fd.append(`${oldKey}[]`, filterVariable(item))
                }
            })
        } else {
            fd.append(oldKey, '[]')
        }
    }

    const setFdObject = (newValues: any, oldKey: string) => {
        if (newValues) {
            Object.keys(newValues).forEach((key) => {
                if (
                    !(newValues[key] instanceof File) &&
                    typeof newValues[key] === 'object'
                ) {
                    setFdObject(newValues[key], `${oldKey}[${key}]`)
                } else if (newValues[key] instanceof Array) {
                    setFdArray(newValues[key], `${oldKey}[${key}][]`)
                } else {
                    fd.append(
                        `${oldKey}[${key}]`,
                        filterVariable(newValues[key])
                    )
                }
            })
        }
    }

    if (values) {
        Object.keys(values).forEach((key) => {
            if (values[key]?.length === 0) {
                fd.append(key, filterVariable([]))
            } else if (
                !(values[key] instanceof File) &&
                typeof values[key] === 'object'
            ) {
                setFdObject(values[key], key)
            } else if (Array.isArray(values[key])) {
                setFdArray(values[key], key)
            } else {
                fd.append(key, filterVariable(values[key]))
            }
        })
    }
    return fd
}

/**
 * GET SN NUMBER
 * @param page
 * @param index
 */
export const getSn = (page: number | undefined, index: number) => {
    return (page ? page - 1 : 0) * AppConfig.per_page + (index + 1)
}

/** Dummy request for antd upload */
export const dummyRequest = (data: any) => {
    const { onSuccess } = data
    setTimeout(() => {
        onSuccess('ok')
    }, 0)
}

/**
 * BOWSER EVENT STOP PROPAGATION
 * @param event
 */
export const stopPropagation = (event: React.MouseEvent<any>) => {
    event?.stopPropagation()
}

/**
 *
 * @param date
 * @param format
 */
export const formatDate = (
    date: string | Date | null,
    format = 'YYYY-MM-DD hh:mm:ss'
) => {
    if (!date) {
        return ''
    }
    return dayjs(date).format(format)
}

/**
 *
 * @param numerator
 * @param denominator
 */
export const calculatePercentage = (
    numerator: number | string,
    denominator: number | string
) => {
    numerator =
        typeof numerator === 'string' ? parseFloat(numerator) : numerator
    denominator =
        typeof denominator === 'string' ? parseFloat(denominator) : denominator

    if (denominator === 0) {
        return 0
    }
    const percentage = (numerator / denominator) * 100
    return percentage % 1 === 0 ? percentage : percentage.toFixed(2)
}

export const nepaliFormat = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num)
}

/**
 * CHECK IF THE APPLICATION IS RUNNING ON CLIENT SIDE
 * @returns boolean
 */
export const isClient = (): boolean => {
    return (
        typeof window !== 'undefined' &&
        typeof localStorage !== 'undefined' &&
        typeof document !== 'undefined'
    )
}

