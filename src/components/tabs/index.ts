import TabsBase, { TabPane } from './Tabs'

export type {
  TabsProps,
  TabPaneProps,
  TabsValue,
  TabsType,
  TabsAlign,
  TabsSwipeableConfig,
  TabsRef,
} from './types'
export { useTabsTokens } from './tokens'

const Tabs = Object.assign(TabsBase, { TabPane })

export { TabPane }
export default Tabs
