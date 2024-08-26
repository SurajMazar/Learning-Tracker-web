import LayoutTypes, {NO_LAYOUT} from '@/settings/config/layout.config'

/** INTERFACE FOR KEY OF LAYOUT TYPES */
export type LayoutTypeKeyInterface = keyof typeof LayoutTypes | typeof NO_LAYOUT

/** LAYOUT HOC COMPONENT PROP TYPE  */
export type ApplicationLayoutProps = {
    layoutType?: LayoutTypeKeyInterface
}
