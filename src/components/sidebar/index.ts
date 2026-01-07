import SidebarBase from './Sidebar'
import SidebarItem from './SidebarItem'

export type { SidebarProps, SidebarItemProps } from './types'
export { useSidebarTokens } from './tokens'

const Sidebar = Object.assign(SidebarBase, { Item: SidebarItem })

export { SidebarItem }
export default Sidebar
