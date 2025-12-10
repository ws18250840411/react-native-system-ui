import React from "react"
import { Cell, Input } from "react-native-system-ui"

export default function InputAlignDemo() {
  const [value, setValue] = React.useState("")

  return (
    <Cell.Group>
      <Input
        placeholder="内容居中"
        value={value}
        onChangeText={setValue}
        align="center"
      />
      <Input
        placeholder="内容右对齐"
        value={value}
        onChangeText={setValue}
        align="right"
      />
    </Cell.Group>
  )
}
