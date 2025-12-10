import React, { Fragment } from "react"
import { Button, Calendar, Form, Picker, Selector, Typography, Field } from "react-native-system-ui"

const cityColumns = ["南京", "苏州", "常州", "淮安", "扬州", "南通", "宿迁", "泰州", "无锡"]

export default function FormShouldUpdateDemo() {
  const formRef = Form.useForm()

  return (
    <Form
      ref={formRef}
      colon
      initialValues={{ type: ["mobile"] }}
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
      <Form.Item name="type" label="联系方式">
        <Selector
          multiple
          options={[
            { label: "手机号", value: "mobile" },
            { label: "住址", value: "address" },
          ]}
        />
      </Form.Item>

      <Form.Item noStyle shouldUpdate={(prev, next) => prev.type !== next.type}>
        {({ getFieldValue }) => {
          const type: string[] = getFieldValue("type") || []
          const content: React.ReactNode[] = []

          if (type.includes("mobile")) {
            content.push(
              <Form.Item key="mobile" name="mobile" label="手机号">
                <Field placeholder="请输入手机号" />
              </Form.Item>,
            )
          }

          if (type.includes("address")) {
            content.push(
              <Fragment key="address">
                <Form.Item
                  name="area"
                  label="区域"
                  trigger="onConfirm"
                  onClick={(_, actions) => actions?.current?.open?.()}
                >
                  <Picker popup columns={cityColumns}>
                    {val => (val ? <Typography.Text>{val}</Typography.Text> : "请选择地址")}
                  </Picker>
                </Form.Item>
                <Form.Item name="area_address" label="详细地址">
                  <Field placeholder="请输入详细地址" />
                </Form.Item>
              </Fragment>,
            )
          }

          return content
        }}
      </Form.Item>
    </Form>
  )
}
