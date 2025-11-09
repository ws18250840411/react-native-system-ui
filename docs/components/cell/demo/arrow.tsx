import React from 'react'

import { Cell } from 'react-native-system-ui'

export default () => (
  <Cell.Group>
    <Cell title="右箭头" isLink />
    <Cell title="上箭头" isLink arrowDirection="up" />
    <Cell title="下箭头" isLink arrowDirection="down" />
  </Cell.Group>
)
