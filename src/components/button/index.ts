import { Button as ButtonBase } from './Button'
import { ButtonGroup } from './ButtonGroup'

const Button = Object.assign(ButtonBase, { Group: ButtonGroup })

export default Button
export { Button }
export type {
  ButtonProps,
  ButtonType,
  ButtonSize,
  ButtonIconPosition,
  ButtonShadowLevel,
  ButtonMode,
} from './types'
