import {LayoutTypeKeyInterface} from "@/@types/containers/layout/layout";

export interface AppConfigInterface {
    auth_token: string
    per_page: number
    api_url: string,
    default_layout: LayoutTypeKeyInterface
}
