import React from 'react'

import { Button, Field, Form, Toast } from 'react-native-system-ui'

export default () => {
  const formRef = Form.useForm()

  const asyncValidator = async (value?: string) => {
    Toast.info({ message: '验证中...', duration: 800 })
    await new Promise(resolve => setTimeout(resolve, 800))
    return /^\d{6}$/.test(value ?? '') ? true : '请输入正确内容'
  }

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
      <Form.Item name="pattern" label="正则校验" rules={[{ pattern: /^\d{6}$/, message: '请输入 6 位数字' }]}>
        <Field placeholder="请输入 6 位数字" clearable />
      </Form.Item>

      <Form.Item
        name="validator"
        label="函数校验"
        rules={[{
          validator: value => (/^1\\d{10}$/.test(value ?? '') ? true : '请输入正确的手机号码'),
        }]}
      >
        <Field placeholder="请输入手机号" clearable />
      </Form.Item>

      <Form.Item
        name="async"
        label="异步校验"
        validateTrigger="onBlur"
        rules={[{
          validateTrigger: 'onBlur',
          validator: asyncValidator,
        }]}
      >
        <Field placeholder="请输入 6 位数字" border={false} />
      </Form.Item>
    </Form>
  )
}
