import React from "react"
import { Text } from "react-native"

import { Button, Field } from "react-native-system-ui"

export default function FieldCustomDemo() {
  const [code, setCode] = React.useState("")

  return (
    <Field
      label="验证码"
      prefix={<Text style={{ color: "#576b95" }}>+86</Text>}
      suffix={
        <Button size="small" onPress={() => {}}>
          发送
        </Button>
      }
      extra="60s"
      clearable
      required
      placeholder="短信验证码"
      value={code}
      onChangeText={setCode}
    />
  )
}
