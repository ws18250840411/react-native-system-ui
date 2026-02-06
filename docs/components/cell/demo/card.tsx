import React from 'react'

import { Cell } from 'react-native-system-ui'

export default function CellCardDemo() {
  return (
  <Cell.Group card>
    <Cell title="单元格" value="内容" />
    <Cell title="单元格" value="内容" />
  </Cell.Group>
  )
}
