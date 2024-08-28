import { useContext } from 'react'
import { NotificationContext } from '@/container/context/NotificationContext'

/**
 * USE NOTIFICATION HOOK
 */
const useNotification = () => {
    return useContext(NotificationContext)
}

export default useNotification
