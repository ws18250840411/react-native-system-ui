import React from "react"

import { Input } from "react-native-system-ui"

const BasicInputDemo = () => {
  const [value, setValue] = React.useState("")

  return (
    <Input
      label="姓名"
      placeholder="请输入姓名"
      value={value}
      onChangeText={setValue}
      clearable
      style={{ marginBottom: 12 }}
    />
  )
}

export default BasicInputDemo
