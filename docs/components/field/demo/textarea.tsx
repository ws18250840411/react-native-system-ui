import React from "react"

import { Field } from "react-native-system-ui"

export default function FieldTextareaDemo() {
  const [message, setMessage] = React.useState("")

  return (
    <Field
      label="留言"
      type="textarea"
      rows={2}
      autoSize={{ minRows: 2, maxRows: 5 }}
      showWordLimit
      maxLength={80}
      description="高度会随内容自动增高"
      placeholder="请留下想说的话"
      value={message}
      onChangeText={setMessage}
    />
  )
}
