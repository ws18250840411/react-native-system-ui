import React from "react"
import { Field } from "react-native-system-ui"

export default function FieldErrorDemo() {
  const [username, setUsername] = React.useState("")
  const [phone, setPhone] = React.useState("")

  return (
    <>
      <Field
        required
        label="用户名"
        placeholder="请输入用户名"
        value={username}
        onChangeText={setUsername}
        error
      />
      <Field
        required
        label="手机号"
        placeholder="请输入手机号"
        value={phone}
        onChangeText={setPhone}
        keyboardType="number-pad"
        errorMessage="手机号格式错误"
      />
    </>
  )
}
