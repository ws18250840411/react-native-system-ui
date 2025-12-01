import SidebarBase from './Sidebar'
import SidebarItem from './SidebarItem'

export type { SidebarProps, SidebarItemProps } from './types'
export { useSidebarTokens } from './tokens'

const Sidebar = SidebarBase as typeof SidebarBase & {
  Item: typeof SidebarItem
}

Sidebar.Item = SidebarItem

export { SidebarItem }
export default Sidebar
