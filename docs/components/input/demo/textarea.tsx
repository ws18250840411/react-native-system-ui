import React from "react"
import { Text } from "react-native"

import { Input } from "react-native-system-ui"

const TextAreaDemo = () => {
  const [value, setValue] = React.useState("")

  return (
    <Input.TextArea
      label="留言"
      value={value}
      onChangeText={setValue}
      placeholder="请输入留言"
      autoSize={{ minHeight: 80, maxHeight: 160 }}
      maxLength={80}
      showWordLimit={({ currentCount, maxLength }) => (
        <Text style={{ color: "#888", fontSize: 12 }}>{`已输入 ${currentCount}${maxLength ? `/${maxLength}` : ""}`}</Text>
      )}
    />
  )
}

export default TextAreaDemo
