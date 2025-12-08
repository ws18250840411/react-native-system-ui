import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Field, Form, Toast } from 'react-native-system-ui'

export default function FormRulesDemo() {
  const formRef = Form.useForm()

  const handleFinish = (values: any) => {
    console.log(values)
  }

  return (
    <View style={styles.page}>
      <Form
        ref={formRef}
        onFinish={handleFinish}
        style={styles.card}
      >
        <Form.Item
          name="regex"
          label="正则校验"
          rules={[{ pattern: /^\d{6}$/, message: '请输入6位数字' }]}
        >
          <Field placeholder="正则校验" />
        </Form.Item>

        <Form.Item
          name="func"
          label="函数校验"
          rules={[{
            validator: value => (/^1\d{10}$/.test(value ?? '') ? true : '请输入正确的手机号码'),
          }]}
        >
          <Field placeholder="函数校验" />
        </Form.Item>

        <Form.Item
          name="async"
          label="异步函数校验"
          rules={[{
            validator: async value => {
              Toast.show({ message: '验证中...', duration: 800 })
              await new Promise(resolve => setTimeout(resolve, 800))
              return /^\d{6}$/.test(value ?? '') ? true : '请输入正确内容'
            },
          }]}
        >
          <Field placeholder="异步函数校验" border={false} />
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
