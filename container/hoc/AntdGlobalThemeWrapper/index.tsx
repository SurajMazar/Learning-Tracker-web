import React, {PropsWithChildren} from "react";
import {ConfigProvider} from "antd";
import theme from "@/core/theme/themeConfig";

const AntdGlobalThemeWrapper: React.FC<PropsWithChildren> = ({children}) => {
    return <ConfigProvider theme={theme}>
        {children}
    </ConfigProvider>
}

export default AntdGlobalThemeWrapper
