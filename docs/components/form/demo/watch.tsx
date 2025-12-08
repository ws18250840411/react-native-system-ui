import React from 'react'
import { View, Text } from 'react-native'
import { Form, Field, FieldGroup } from 'react-native-system-ui'

export default function FormWatchDemo() {
  const formRef = Form.useForm()
  const username = Form.useWatch('username', formRef)
  const allValues = Form.useWatch(undefined, formRef)

  return (
    <View style={{ gap: 12 }}>
      <Form ref={formRef} initialValues={{ username: 'Jack', phone: '' }}>
        <FieldGroup title="useWatch 监听">
          <Form.Item name="username">
            <Field label="用户名" placeholder="输入用户名" clearable />
          </Form.Item>
          <Form.Item name="phone">
            <Field label="手机号" placeholder="输入手机号" clearable />
          </Form.Item>
        </FieldGroup>
        <Text style={{ color: '#666' }}>实时用户名：{String(username ?? '')}</Text>
        <Text style={{ color: '#666' }}>所有值：{JSON.stringify(allValues)}</Text>
      </Form>
    </View>
  )
}
