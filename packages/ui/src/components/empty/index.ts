import { attachPropertiesToComponent } from '../../foundation/helpers'

import Empty from './empty'
import { varCreator, styleCreator } from './style'

export default attachPropertiesToComponent(Empty, { varCreator, styleCreator })
