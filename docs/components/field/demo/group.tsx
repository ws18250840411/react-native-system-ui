import React from "react"

import { Field, FieldGroup } from "react-native-system-ui"

export default function FieldGroupDemo() {
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")

  return (
    <FieldGroup title="登录信息" inset>
      <Field
        label="用户名"
        required
        placeholder="请输入用户名"
        value={username}
        onChangeText={setUsername}
        clearable
      />
      <Field
        label="密码"
        type="password"
        placeholder="请输入密码"
        value={password}
        onChangeText={setPassword}
      />
    </FieldGroup>
  )
}
