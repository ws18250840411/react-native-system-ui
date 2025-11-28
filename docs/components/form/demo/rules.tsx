import React from "react"
import { View } from "react-native"

import { Button, Field, FieldGroup, Form } from "react-native-system-ui"

export default function FormRulesDemo() {
  const formRef = Form.useForm()
  const [status, setStatus] = React.useState<string>()

  const handleValidate = async () => {
    try {
      const values = await formRef.current?.validateFields()
      setStatus(`值：${JSON.stringify(values)}`)
    } catch (error) {
      setStatus("存在未通过的校验项")
    }
  }

  return (
    <View style={{ gap: 12 }}>
      <Form ref={formRef} colon>
        <FieldGroup title="错误提示">
          <Form.Item
            name="user"
            rules={[
              { required: true, message: "请输入用户名" },
              { min: 4, message: "至少输入 4 个字符" },
            ]}
          >
            <Field label="用户名" placeholder="请输入用户名" clearable />
          </Form.Item>
          <Form.Item
            name="phone"
            validateTrigger="onBlur"
            rules={[
              { required: true, message: "请输入手机号" },
              {
                pattern: /^1\d{10}$/,
                message: "手机号格式错误",
                validateTrigger: "onBlur",
              },
            ]}
          >
            <Field label="手机号" placeholder="请输入手机号" clearable />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              {
                validator: async value => {
                  if (!value) {
                    return "请输入验证码"
                  }
                  await new Promise(resolve => setTimeout(resolve, 50))
                  if (value !== "1234") {
                    return "验证码不正确"
                  }
                  return undefined
                },
              },
            ]}
          >
            <Field label="验证码" placeholder="请输入验证码" showWordLimit maxLength={4} />
          </Form.Item>
        </FieldGroup>
      </Form>
      <Button type="primary" onPress={handleValidate} text="校验" />
      {status ? <Field label="结果" description={status} editable={false} /> : null}
    </View>
  )
}
