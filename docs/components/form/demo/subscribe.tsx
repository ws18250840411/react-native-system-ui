import React from 'react'
import { Text } from 'react-native'
import { Form, Field, FieldGroup } from 'react-native-system-ui'

export default function FormSubscribeDemo() {
  const formRef = Form.useForm()

  return (
    <Form ref={formRef} initialValues={{ a: '', b: '' }}>
      <FieldGroup title="订阅字段变更">
        <Form.Item name="a">
          <Field label="字段 A" placeholder="输入同步变化" clearable />
        </Form.Item>
        <Form.Item name="b">
          <Field label="字段 B" placeholder="输入同步变化" clearable />
        </Form.Item>
        <Form.Subscribe to={['a', 'b']}>
          {(changed, form) => (
            <Text style={{ color: '#666' }}>
              最近变更：{JSON.stringify(changed)}，当前值：{JSON.stringify(form?.getFieldsValue?.() ?? {})}
            </Text>
          )}
        </Form.Subscribe>
      </FieldGroup>
    </Form>
  )
}
