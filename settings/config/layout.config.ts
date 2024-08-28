import AuthLayout from "@/container/layouts/auth";
import AppLayout from "@/container/layouts/app";

const ApplicationLayouts = {
    auth: {
        component: AuthLayout
    },
    app:{
        component: AppLayout
    }
} as const

export const NO_LAYOUT = 'no_layout'
export const ApplicationLayoutsMapping = Object.entries(ApplicationLayouts).reduce((acc, item) => {
    const key = item[0] as unknown as keyof typeof ApplicationLayouts | typeof NO_LAYOUT
    return {
        ...acc,
        [key]: key
    }
}, {no_layout: NO_LAYOUT} as Record<keyof typeof ApplicationLayouts | typeof NO_LAYOUT, keyof typeof ApplicationLayouts | typeof NO_LAYOUT>)

export default ApplicationLayouts
