import { attachPropertiesToComponent } from '../../foundation/helpers'

import { varCreator } from './style'
import WaterMark from './water-mark'

export default attachPropertiesToComponent(WaterMark, {
  varCreator,
})
