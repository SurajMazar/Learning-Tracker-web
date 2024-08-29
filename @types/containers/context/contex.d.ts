import React from "react";

export type NotificationTypeInterface = 'info' | 'success' | 'error'

export interface NotificationContextInterface {
    notify: (
        message: string | React.ReactNode,
        type?: NotificationTypeInterface,
        messageBody?: string| React.ReactNode,
        placement?: "top" | "topLeft" | "topRight" | "bottom" | "bottomLeft" | "bottomRight"
    ) => void
}

