import React from 'react'

import { Button, Field, Form, Toast } from 'react-native-system-ui'

export default function FormBasicDemo() {
  const formRef = Form.useForm()

  return (
    <Form
      ref={formRef}
      onFinish={values => Toast.info(JSON.stringify(values))}
      style={{ paddingHorizontal: 12 }}
      footer={(
        <Button
          round
          block
          type="primary"
          text="提交"
          onPress={() => formRef.current?.submit()}
          style={{ marginTop: 12 }}
        />
      )}
    >
      <Form.Item name="username" label="用户名" rules={[{ required: true, message: '请填写用户名' }]}>
        <Field placeholder="请输入用户名" clearable />
      </Form.Item>
      <Form.Item name="password" label="密码" rules={[{ required: true, message: '请填写密码' }]}>
        <Field placeholder="请输入密码" type="password" border={false} />
      </Form.Item>
    </Form>
  )
}
