export type NotificationTypeInterface = 'info' | 'success' | 'error'

export interface NotificationContextInterface {
    notify: (
        message: string,
        type?: NotificationTypeInterface,
        messageBody?: string,
        placement?: "top" | "topLeft" | "topRight" | "bottom" | "bottomLeft" | "bottomRight"
    ) => void
}

