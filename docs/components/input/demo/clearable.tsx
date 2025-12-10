import React from "react"
import { Cell, Input } from "react-native-system-ui"

export default function InputClearableDemo() {
  const [value, setValue] = React.useState("")

  return (
    <Cell.Group>
      <Input
        placeholder="请输入文本"
        value={value}
        onChangeText={setValue}
        clearable
        clearTrigger="always"
      />
    </Cell.Group>
  )
}
