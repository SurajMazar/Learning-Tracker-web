/**
 * Set value in local storage
 * @param key
 * @param value
 */
export const setLocalStorage = (key: string, value: any) => {
    if (value && typeof value === 'string') {
        localStorage.setItem(key, value)
    } else {
        localStorage.setItem(key, JSON.stringify(value)) // convert arrays or objects into strings
    }
}

/**
 * Json parseable?
 * @param data
 * @returns
 */
export const isJsonParseAble = (data: any) => {
    try {
        if (JSON.parse(data)) {
            return true
        }
    } catch {
        return false
    }
}

/**
 * Gets value from local storage
 * @param {*} key
 * @returns
 */
export const getLocalStorage = async (key: string) => {
    const value = await localStorage.getItem(key)
    if (value && isJsonParseAble(value)) {
        return JSON.parse(value)
    }
    return value
}
