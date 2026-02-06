import React from 'react'
import { Field } from 'react-native-system-ui'

export default function FieldTextareaAutoDemo() {
  const [content, setContent] = React.useState("")

  return (
    <Field
      label="留言"
      type="textarea"
      rows={1}
      autoSize
      placeholder="请输入留言"
      value={content}
      onChangeText={setContent}
    />
  )
}
