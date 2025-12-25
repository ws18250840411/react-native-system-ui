import TabsBase from './Tabs'
import TabPane from './TabPane'

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

const Tabs = TabsBase as typeof TabsBase & {
  TabPane: typeof TabPane
}

Tabs.TabPane = TabPane

export { TabPane }
export default Tabs
