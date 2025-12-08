import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Field, Form } from 'react-native-system-ui'

export default function FormBasicDemo() {
  const formRef = Form.useForm()

  return (
    <View style={styles.page}>
      <Form
        ref={formRef}
        initialValues={{ username: '', password: '' }}
        onFinish={values => console.log(values)}
        showValidateMessage
        style={styles.card}
      >
        <Form.Item
          name="username"
          label="用户名"
          intro="确保这是唯一的用户名"
          tooltip={{ message: '只能包含字母、数字，且长度 4-16 位' }}
          rules={[{ required: true, message: '请填写用户名' }]}
        >
          <Field placeholder="请输入用户名" clearable />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[{ required: true, message: '请填写密码' }]}
        >
          <Field placeholder="请输入密码" type="password" border={false} />
        </Form.Item>
      </Form>

      <View style={styles.footer}>
        <Button round block type="primary" text="提交" onPress={() => formRef.current?.submit()} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    padding: 12,
    backgroundColor: '#f7f8fa',
    borderRadius: 12,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    overflow: 'hidden',
  },
  footer: {
    marginTop: 16,
    paddingHorizontal: 4,
  },
})
