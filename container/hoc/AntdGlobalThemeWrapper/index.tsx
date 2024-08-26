import React, {PropsWithChildren} from "react";

const AntdGlobalThemeWrapper: React.FC<PropsWithChildren> = ({children}) => {
    return <>
        {children}
    </>
}

export default AntdGlobalThemeWrapper
