import React, {PropsWithChildren} from "react";
import {ConfigProvider} from "antd";
import theme from "@/settings/config/theme.config";

const AntdGlobalThemeWrapper: React.FC<PropsWithChildren> = ({children}) => {
    return <ConfigProvider theme={theme}>
        {children}
    </ConfigProvider>
}

export default AntdGlobalThemeWrapper
