import React from "react"
import { FieldGroup, Input } from "react-native-system-ui"

export default function InputClearableDemo() {
  const [value, setValue] = React.useState("")

  return (
    <FieldGroup title="清除按钮">
      <Input
        placeholder="请输入文本"
        value={value}
        onChangeText={setValue}
        clearable
        clearTrigger="always"
      />
    </FieldGroup>
  )
}
