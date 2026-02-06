import React from 'react'
import { Text } from 'react-native'

import { Field } from 'react-native-system-ui'

export default function FieldIconDemo() {
  const [phone, setPhone] = React.useState("")
  const [name, setName] = React.useState("")

  return (
    <>
      <Field
        label="文本"
        leftIcon={<Text>📦</Text>}
        tooltip="提示"
        placeholder="请输入内容"
        center
        value={name}
        onChangeText={setName}
      />
      <Field
        label="文本"
        leftIcon={<Text>📱</Text>}
        placeholder="请输入手机号"
        center
        clearable
        value={phone}
        onChangeText={setPhone}
      />
    </>
  )
}
