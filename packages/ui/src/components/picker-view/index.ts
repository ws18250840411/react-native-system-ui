import { attachPropertiesToComponent } from '../../foundation/helpers'

import PickerView from './picker-view'
import { varCreator, styleCreator } from './style'

export default attachPropertiesToComponent(PickerView, {
  varCreator,
  styleCreator,
})
