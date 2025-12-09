import React from "react"
import { FieldGroup, Input } from "react-native-system-ui"

export default function InputTextareaDemo() {
  return (
    <FieldGroup title="多行输入">
      <Input.TextArea placeholder="多行输入" />
      <Input.TextArea placeholder="自适应高度" autoSize />
      <Input.TextArea
        placeholder="最小高度80，最大高度120"
        autoSize={{ minHeight: 80, maxHeight: 120 }}
      />
    </FieldGroup>
  )
}
