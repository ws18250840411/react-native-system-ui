import React from "react"
import { FieldGroup, Input } from "react-native-system-ui"

export default function InputAlignDemo() {
  const [value, setValue] = React.useState("")

  return (
    <FieldGroup title="对齐方式">
      <Input placeholder="内容居中" value={value} onChangeText={setValue} align="center" />
      <Input placeholder="内容右对齐" value={value} onChangeText={setValue} align="right" />
    </FieldGroup>
  )
}
