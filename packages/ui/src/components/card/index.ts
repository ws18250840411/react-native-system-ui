import { attachPropertiesToComponent } from '../../foundation/helpers'

import Card from './card'
import CardBody from './card-body'
import { varCreator, styleCreator } from './style'

export default attachPropertiesToComponent(Card, {
  varCreator,
  styleCreator,
  Body: CardBody,
})
