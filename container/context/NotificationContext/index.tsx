import React, {PropsWithChildren} from 'react'
import {NotificationContextInterface, NotificationTypeInterface} from '@/@types/containers/context/contex'
import {notification} from 'antd'

/**
 * NOTIFICATION CONTEXT
 */
export const NotificationContext =
    React.createContext<NotificationContextInterface>({} as NotificationContextInterface)

const NotificationWrapper: React.FC<PropsWithChildren> = ({children}) => {
    /**
     * HOOKS
     */
    const [api, contextHolder] = notification.useNotification()

    /**
     *
     * @param message
     * @param type
     * @param messageBody
     * @param placement
     */
    const notify = (
        message: string | React.ReactNode,
        type: NotificationTypeInterface = 'success',
        messageBody: string | React.ReactNode = '',
        placement: "top" | "topLeft" | "topRight" | "bottom" | "bottomLeft" | "bottomRight" | undefined = undefined
    ) => {
        api[type]({
            message,
            ...(messageBody && {
                description: <>{messageBody}</>
            }),
            placement,
            duration: 1.5
        })
    }

    return (
        <NotificationContext.Provider
            value={{
                notify
            }}
        >
            {contextHolder}
            {children}
        </NotificationContext.Provider>
    )
}

export default NotificationWrapper
