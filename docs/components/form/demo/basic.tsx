import React from "react"
import { View } from "react-native"

import { Button, Field, FieldGroup, Form } from "react-native-system-ui"

export default function FormBasicDemo() {
  const formRef = Form.useForm()
  const [result, setResult] = React.useState<string>()

  return (
    <View style={{ gap: 12 }}>
      <Form
        ref={formRef}
        initialValues={{ username: "Jack", password: "" }}
        onFinish={values => setResult(JSON.stringify(values))}
        colon
      >
        <FieldGroup inset title="基础用法">
          <Form.Item name="username">
            <Field label="用户名" placeholder="请输入用户名" clearable />
          </Form.Item>
          <Form.Item name="password">
            <Field label="密码" type="password" placeholder="请输入密码" />
          </Form.Item>
        </FieldGroup>
      </Form>
      <Button
        type="primary"
        onPress={() => formRef.current?.submit()}
        text="提交"
      />
      {result ? <Field label="结果" description={result} editable={false} /> : null}
    </View>
  )
}
