import { attachPropertiesToComponent } from '../../foundation/helpers'

import { varCreator, styleCreator } from './style'
import TabBar from './tab-bar'

export default attachPropertiesToComponent(TabBar, {
  varCreator,
  styleCreator,
})
