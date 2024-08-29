import useComputed from '@/core/hooks/useComputed'
import {useState} from 'react'

/**
 * USE ARRAY HOOK
 * @param array
 */
const useArrayObj = <T extends Record<string, any>>(array: Array<T>) => {
    /**
     * DEFAULT DATA STATE
     */
    const [data, setData] = useState<Array<T>>(array)

    /**
     * REPLACE OBJECT FROM ARRAY
     * @param item
     * @param key
     */
    const update = (item: T, key: keyof T) => {
        /**
         * OLD OBJECT INDEX
         */
        const oldObjectIndex = data.findIndex(
            (dataItem) => item[key] === dataItem[key]
        )

        /**
         * IF IS A VALID INDEX
         */
        if (!isNaN(oldObjectIndex)) {
            const updatedData = [...data]
            updatedData[oldObjectIndex] = item
            setData(updatedData)
        }
    }

    /**
     * REPLACE OBJECTS FROM ARRAY
     * @param items
     * @param key
     */
    const replaceObjects = (items: Array<T>, key: keyof T) => {
        const updatedData = [...data]

        items.forEach((item) => {
            /**
             * OLD OBJECT INDEX
             */
            const oldObjectIndex = data.findIndex(
                (dataItem) => item[key] === dataItem[key]
            )

            /**
             * IF IS A VALID INDEX
             */
            if (!isNaN(oldObjectIndex)) {
                updatedData[oldObjectIndex] = item
            }
        })

        setData(updatedData)
    }

    /**
     * FILTER THE ARRAY AS PER NEED
     * @param filterFunction
     * @returns
     */
    function Filter<U>(filterFunction: (data: Array<T>) => U) {
        return useComputed(() => {
            return filterFunction(data) as U
        }, [data])
    }

    /**
     * APPEND DATA TO THE ARRAY
     * @param item
     */
    const append = (item: T) => {
        const updated = [...data, item]
        setData(updated)
    }

    /**
     * DELETE ITEM FROM ARRAY
     * @param deletedItem
     * @param key
     */
    const deleteItem = (deletedItem: T, key: keyof T) => {
        const updated = [...data].filter(
            (item) => item[key] !== deletedItem[key]
        )
        setData(updated)
    }

    type FilterFunctionInterface = (item: T) => boolean

    /**
     *
     * @param value
     * @param key
     * @param filter
     */
    const findObject = (
        value: any,
        key: keyof T,
        filter: undefined | FilterFunctionInterface = undefined
    ) => {
        if (filter) {
            return [...data].find(filter)
        }
        return [...data].find((item) => item[key] === value)
    }

    return {
        setData,
        data,
        update,
        replaceObjects,
        filter: Filter,
        findObject,
        deleteItem,
        append
    }
}

export default useArrayObj
