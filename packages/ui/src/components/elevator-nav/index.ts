import { attachPropertiesToComponent } from '../../foundation/helpers'

import ElevatorNavComponent from './elevator-nav'
import ElevatorNavAnchor from './elevator-nav-anchor'

export default attachPropertiesToComponent(ElevatorNavComponent, {
  Anchor: ElevatorNavAnchor,
})
