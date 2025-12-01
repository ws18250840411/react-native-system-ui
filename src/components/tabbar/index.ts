import TabbarBase from './Tabbar'
import TabbarItem from './TabbarItem'

export type { TabbarProps, TabbarItemProps, TabbarValue } from './types'
export { useTabbarTokens } from './tokens'

const Tabbar = TabbarBase as typeof TabbarBase & {
  Item: typeof TabbarItem
}

Tabbar.Item = TabbarItem

export { TabbarItem }
export default Tabbar
