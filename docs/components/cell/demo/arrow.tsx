import React from 'react'

import { Cell } from 'react-native-system-ui'

export default () => (
  <Cell.Group>
    <Cell title="单元格" isLink />
    <Cell title="单元格" isLink value="内容" />
    <Cell title="单元格" isLink arrowDirection="down" value="内容" />
  </Cell.Group>
)
