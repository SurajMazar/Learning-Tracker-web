import {CustomAppProps} from "@/@types/next";
import ReduxContainer from "@/container/hoc/Redux";
import ApplicationBoot from "@/container/hoc/ApplicationBoot";
import AntdGlobalThemeWrapper from "@/container/hoc/AntdGlobalThemeWrapper";
import ReactQueryContainer from "@/container/hoc/ReactQueryContainer";
import ApplicationLayout from "@/container/layouts";

export default function App({Component, pageProps}: CustomAppProps) {
    return (<>
        <ReduxContainer>
            <ApplicationBoot>
                <AntdGlobalThemeWrapper>
                    <ApplicationLayout layoutType={Component.layout}>
                        <ReactQueryContainer>
                            <Component {...pageProps} />
                        </ReactQueryContainer>
                    </ApplicationLayout>
                </AntdGlobalThemeWrapper>
            </ApplicationBoot>
        </ReduxContainer>
    </>)
}
