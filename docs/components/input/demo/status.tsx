import React from "react"
import { Cell, Input } from "react-native-system-ui"

export default function InputStatusDemo() {
  const [value1, setValue1] = React.useState("只读模式")
  const [value2, setValue2] = React.useState("禁用模式")

  return (
    <Cell.Group>
      <Input value={value1} onChangeText={setValue1} readOnly />
      <Input value={value2} onChangeText={setValue2} disabled />
    </Cell.Group>
  )
}
