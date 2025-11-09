import { Button as ButtonBase } from './Button'
import { ButtonGroup } from './ButtonGroup'

const Button = Object.assign(ButtonBase, { Group: ButtonGroup })

export default Button
export { Button }
export type { ButtonProps } from './types'
export type {
  ButtonTokens,
  ButtonType,
  ButtonSize,
  ButtonIconPosition,
  ButtonShadowLevel,
} from './tokens'
export { createButtonTokens } from './tokens'
