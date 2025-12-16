import React from 'react'
import { Button, Cascader, Field, Form, Space, Toast, type CascaderOption } from 'react-native-system-ui'

import options from './options'

const formatValue = (rows: CascaderOption[]) =>
  rows
    .map(item => item?.text)
    .filter(Boolean)
    .join(' / ')

export default function CascaderFormDemo() {
  const formRef = Form.useForm()

  const handleSetDefault = () => {
    formRef.current?.setFieldsValue({ area: ['330000', '330100', '330104'] })
  }

  return (
    <Form ref={formRef} style={{ paddingHorizontal: 12 }} onFinish={values => Toast.info(JSON.stringify(values))}>
      <Form.Item name="area" trigger="onChange">
        <Cascader poppable popupRound title="请选择地区" options={options}>
          {(_, rows, actions) => (
            <Field
              label="地区"
              readOnly
              isLink
              value={formatValue(rows)}
              placeholder="请选择地区"
              onClick={actions.open}
            />
          )}
        </Cascader>
      </Form.Item>
      <Space justify="center" style={{ marginTop: 20 }}>
        <Button type="primary" text="提交" onPress={() => formRef.current?.submit()} />
        <Button text="设置默认值" onPress={handleSetDefault} />
      </Space>
    </Form>
  )
}
