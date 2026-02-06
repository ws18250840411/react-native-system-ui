import React from 'react'
import { Cell, Input } from 'react-native-system-ui'

export default function InputAlignDemo() {
  const [center, setCenter] = React.useState("")
  const [right, setRight] = React.useState("")

  return (
    <Cell.Group>
      <Input
        placeholder="内容居中"
        value={center}
        onChangeText={setCenter}
        align="center"
      />
      <Input
        placeholder="内容右对齐"
        value={right}
        onChangeText={setRight}
        align="right"
      />
    </Cell.Group>
  )
}
