import React from "react"
import { Button, Field, Form } from "react-native-system-ui"

export default function FormBasicDemo() {
  const formRef = Form.useForm()

  return (
    <Form
      ref={formRef}
      initialValues={{ username: "", password: "" }}
      onFinish={values => console.log(values)}
      showValidateMessage
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
      <Form.Item
        name="username"
        label="用户名"
        intro="确保这是唯一的用户名"
        tooltip={{ message: "只能包含字母、数字，且长度 4-16 位" }}
        rules={[{ required: true, message: "请填写用户名" }]}
      >
        <Field placeholder="请输入用户名" clearable />
      </Form.Item>
      <Form.Item
        name="password"
        label="密码"
        rules={[{ required: true, message: "请填写密码" }]}
      >
        <Field placeholder="请输入密码" type="password" border={false} />
      </Form.Item>
    </Form>
  )
}
