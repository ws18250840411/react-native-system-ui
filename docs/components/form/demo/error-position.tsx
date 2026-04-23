import React from 'react'

import { Button, Form, Input } from 'react-native-system-ui'

export default function FormErrorPositionDemo() {
  const formRef = Form.useForm()

  return (
    <Form
      ref={formRef}
      onFinish={values => console.log(values)}
      showValidateMessage
      style={{ paddingHorizontal: 16 }}
      footer={
        <Button
          round
          block
          type="primary"
          text="提交"
          onPress={() => formRef.current?.submit()}
          style={{ marginTop: 16 }}
        />
      }
    >
      <Form.Item
        name="phone"
        required={false}
        rules={[
          { required: true, message: '请输入手机号' },
          { pattern: /^1\d{10}$/, message: '手机号格式不正确' },
        ]}
        noStyle
      >
        <Input
          type="tel"
          placeholder="请输入手机号"
          maxLength={11}
          clearable
          border={false}
          errorMessagePosition="outer"
          style={{
            borderRadius: 12,
            borderWidth: 1,
            borderColor: '#E5E5EA',
            backgroundColor: '#fff',
          }}
        />
      </Form.Item>

      <Form.Item
        name="code"
        required={false}
        rules={[
          { required: true, message: '请输入验证码' },
          { len: 6, message: '验证码为 6 位数字' },
        ]}
        noStyle
      >
        <Input
          type="digit"
          placeholder="请输入验证码"
          maxLength={6}
          clearable
          border={false}
          errorMessagePosition="outer"
          style={{
            borderRadius: 12,
            borderWidth: 1,
            borderColor: '#E5E5EA',
            backgroundColor: '#fff',
            marginTop: 12,
          }}
        />
      </Form.Item>
    </Form>
  )
}
