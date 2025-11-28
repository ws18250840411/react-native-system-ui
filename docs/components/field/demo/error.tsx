import React from "react"

import { Field } from "react-native-system-ui"

export default function FieldErrorDemo() {
  const [value, setValue] = React.useState("123")

  const isInvalid = value.length < 6

  return (
    <Field
      label="验证码"
      placeholder="请输入验证码"
      value={value}
      onChangeText={setValue}
      keyboardType="number-pad"
      error={isInvalid}
      errorMessage={isInvalid ? "长度不能少于 6 位" : undefined}
    />
  )
}
