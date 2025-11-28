import React from "react"
import { Text } from "react-native"

import { Field } from "react-native-system-ui"

export default function FieldIconDemo() {
  const [phone, setPhone] = React.useState("")

  return (
    <Field
      label="手机号"
      tooltip="仅用于登录验证"
      leftIcon={<Text>📱</Text>}
      rightIcon={<Text>⚙️</Text>}
      clearable
      keyboardType="phone-pad"
      placeholder="请输入手机号"
      value={phone}
      onChangeText={setPhone}
    />
  )
}
