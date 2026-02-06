import React from 'react'
import { Cell } from 'react-native-system-ui'

export default function CellVerticalDemo() {
  return (
    <Cell.Group>
      <Cell center title="单元格" value="内容" label="描述信息" />
    </Cell.Group>
  )
}
