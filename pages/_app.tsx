import {CustomAppProps} from "@/@types/next";
import ReduxContainer from "@/container/hoc/Redux";
import ApplicationBoot from "@/container/hoc/ApplicationBoot";
import ReactQueryContainer from "@/container/hoc/ReactQueryContainer";
import ApplicationLayout from "@/container/layouts";
import dynamic from "next/dynamic";
import '@/assets/scss/index.scss'
import NotificationWrapper from "@/container/context/NotificationContext";

/**
 * ANTD GLOBAL THEME WRAPPER
 */
const AntdGlobalThemeWrapper = dynamic(
    async () => await import("@/container/hoc/AntdGlobalThemeWrapper"),
    {
        ssr: false,
    }
)

export default function App({Component, pageProps}: CustomAppProps) {
    return (<>
        <ReduxContainer>
            <ApplicationBoot>
                <NotificationWrapper>
                    <AntdGlobalThemeWrapper>
                        <ReactQueryContainer>
                            <ApplicationLayout layoutType={Component.layout}>
                                <Component {...pageProps} />
                            </ApplicationLayout>
                        </ReactQueryContainer>
                    </AntdGlobalThemeWrapper>
                </NotificationWrapper>
            </ApplicationBoot>
        </ReduxContainer>
    </>)
}
