import React from 'react'

import { Button, Field, Form, Selector, Toast } from 'react-native-system-ui'

const options = [
  { label: '手机号', value: 'mobile' },
  { label: '住址', value: 'address' },
]

export default function FormShouldUpdateDemo() {
  const formRef = Form.useForm()

  return (
    <Form
      ref={formRef}
      initialValues={{ type: ['mobile'] }}
      onFinish={values => Toast.info(JSON.stringify(values))}
      style={{ paddingHorizontal: 12 }}
      footer={
        <Button
          round
          block
          type="primary"
          text="提交"
          onPress={() => formRef.current?.submit()}
          style={{ marginTop: 12 }}
        />
      }
    >
      <Form.Item name="type" label="联系方式" trigger="onChange">
        <Selector
          multiple
          options={options}
        />
      </Form.Item>

      <Form.Item shouldUpdate={(prev, next) => prev.type !== next.type}>
        {({ getFieldValue }) => {
          const selected = (getFieldValue('type') ?? []) as string[]

          return (
            <>
              {selected.includes('mobile') ? (
                <Form.Item name="mobile" label="手机号">
                  <Field placeholder="请输入手机号" clearable />
                </Form.Item>
              ) : null}

              {selected.includes('address') ? (
                <>
                  <Form.Item name="area" label="地区">
                    <Field placeholder="请输入地区" clearable />
                  </Form.Item>
                  <Form.Item name="address" label="详细地址">
                    <Field placeholder="请输入详细地址" border={false} />
                  </Form.Item>
                </>
              ) : null}
            </>
          )
        }}
      </Form.Item>
    </Form>
  )
}
