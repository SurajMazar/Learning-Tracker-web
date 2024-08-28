import React, {PropsWithChildren} from 'react'
import AuthProtected from "@/container/hoc/AuthProtected";

const AppLayout: React.FC<PropsWithChildren> = (props) => {

    /**
     * COMPONENT PROPS
     */
    const {children} = props

    return (
        <>
            <AuthProtected>
                {children}
            </AuthProtected>
        </>
    )
}

export default AppLayout
