import { attachPropertiesToComponent } from '../../foundation/helpers'

import Button from './button'
import ButtonOption from './button-option'
import ButtonOptionGroup from './button-option-group'
import ButtonStyle, { varCreator, styleCreator } from './style'

const ButtonWithStatics = attachPropertiesToComponent(Button, {
  varCreator,
  styleCreator,
  Option: ButtonOption,
  OptionGroup: ButtonOptionGroup,
})

export { ButtonStyle, varCreator, styleCreator, ButtonOption, ButtonOptionGroup }

export default ButtonWithStatics
