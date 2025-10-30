import { attachPropertiesToComponent } from '../../foundation/helpers'

import Collapse from './collapse'
import { varCreator, styleCreator } from './style'

export default attachPropertiesToComponent(Collapse, {
  varCreator,
  styleCreator,
})
