import { attachPropertiesToComponent } from '../../foundation/helpers'

import { varCreator, styleCreator } from './style'
import Tag from './tag'

export default attachPropertiesToComponent(Tag, { varCreator, styleCreator })
