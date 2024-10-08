import {AppConfigInterface} from "@/@types/core/config/config";
import {NO_LAYOUT} from "@/settings/config/layout.config";

/**
 * APPLICATION GLOBAL CONFIGURATIONS
 */
const AppConfig: AppConfigInterface = {
    auth_token: 'auth_token',
    per_page: 10,
    api_url: process.env.NEXT_PUBLIC_API_URL || '',
    default_layout: NO_LAYOUT
}

export default AppConfig
