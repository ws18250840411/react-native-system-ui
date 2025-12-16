import React from 'react'
import { Field, Form } from 'react-native-system-ui'

const formatPairs = (values: Record<string, any>) =>
  Object.entries(values)
    .map(([key, value]) => `${key}: ${value ?? ''}`)
    .join('，')

export default function FormSubscribeDemo() {
  const formRef = Form.useForm()

  return (
    <Form ref={formRef} initialValues={{ a: '', b: '' }} style={{ paddingHorizontal: 12 }}>
      <Form.Item name="a" label="字段 A">
        <Field placeholder="请输入内容" clearable />
      </Form.Item>
      <Form.Item name="b" label="字段 B">
        <Field placeholder="请输入内容" clearable />
      </Form.Item>

      <Form.Subscribe to={['a', 'b']}>
        {(changed, form) => (
          <Field
            readOnly
            label="最近变更"
            value={Object.keys(changed).length ? formatPairs(changed) : ''}
            placeholder="输入字段 A / 字段 B 触发"
            border={false}
          />
        )}
      </Form.Subscribe>
    </Form>
  )
}
