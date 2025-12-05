import React from "react"
import { Button, Cascader, Field, Form, Space, Toast, type CascaderOption } from "react-native-system-ui"

import options from "./options"

const formatValue = (rows: CascaderOption[]) => rows.map(item => item?.text).filter(Boolean).join(",")

export default function CascaderFormDemo() {
  const form = Form.useForm()

  const handleSubmit = async () => {
    const values = await form.current?.getFieldsValue()
    Toast.info(JSON.stringify(values))
  }

  const handleSetDefault = () => {
    form.current?.setFieldsValue({ area: ["330000", "330100", "330104"] })
  }

  return (
    <Form ref={form}>
      <Form.Item name="area" label="地区" isLink trigger="onChange">
        <Cascader poppable popupRound title="请选择所在地区" options={options}>
          {(_, rows, actions) => (
            <Field
              readOnly
              isLink
              value={formatValue(rows)}
              placeholder="请选择所在地区"
              onPress={actions.open}
            />
          )}
        </Cascader>
      </Form.Item>
      <Space justify="center" style={{ marginTop: 20 }}>
        <Button type="primary" onPress={handleSubmit}>
          提交
        </Button>
        <Button onPress={handleSetDefault}>设置默认值</Button>
      </Space>
    </Form>
  )
}
