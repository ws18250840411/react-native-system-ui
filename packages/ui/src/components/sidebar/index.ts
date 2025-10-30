import { attachPropertiesToComponent } from '../../foundation/helpers'

import Sidebar from './sidebar'
import { varCreator, styleCreator } from './style'

export default attachPropertiesToComponent(Sidebar, {
  varCreator,
  styleCreator,
})
