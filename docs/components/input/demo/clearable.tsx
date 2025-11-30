import React from "react"

import { Input } from "react-native-system-ui"

const ClearableInputDemo = () => {
  const [value, setValue] = React.useState("")

  return (
    <Input
      label="验证码"
      placeholder="请输入验证码"
      value={value}
      onChangeText={setValue}
      clearable
      clearTrigger="always"
      maxLength={6}
      style={{ marginBottom: 12 }}
    />
  )
}

export default ClearableInputDemo
