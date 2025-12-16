import React from 'react'
import { Field, Form } from 'react-native-system-ui'

const Values: React.FC<{ formRef: ReturnType<typeof Form.useForm> }> = ({ formRef }) => {
  const username = Form.useWatch('username', formRef)
  const allValues = Form.useWatch(undefined, formRef)

  return (
    <>
      <Field readOnly label="实时用户名" value={username ? String(username) : ''} />
      <Field readOnly label="所有值" value={allValues ? JSON.stringify(allValues) : ''} border={false} />
    </>
  )
}

export default function FormWatchDemo() {
  const formRef = Form.useForm()

  return (
    <Form ref={formRef} initialValues={{ username: 'Jack', phone: '' }} style={{ paddingHorizontal: 12 }}>
      <Form.Item name="username" label="用户名">
        <Field placeholder="请输入用户名" clearable />
      </Form.Item>
      <Form.Item name="phone" label="手机号">
        <Field placeholder="请输入手机号" clearable />
      </Form.Item>

      <Values formRef={formRef} />
    </Form>
  )
}
