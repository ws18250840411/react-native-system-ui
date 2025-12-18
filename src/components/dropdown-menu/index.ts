import DropdownMenu from './DropdownMenu'
import DropdownItem from './DropdownItem'

export type {
  DropdownMenuProps,
  DropdownItemProps,
  DropdownOption,
  DropdownMenuDirection,
  DropdownMenuInstance,
  DropdownItemInstance,
} from './types'
export { useDropdownMenuTokens } from './tokens'

const Menu = DropdownMenu as typeof DropdownMenu & { Item: typeof DropdownItem }
Menu.Item = DropdownItem

export { DropdownItem }
export default Menu
