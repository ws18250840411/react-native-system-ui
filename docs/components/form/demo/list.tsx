import React from 'react'
import { View, Text } from 'react-native'

import { AddO } from 'react-native-system-icon'
import { Button, Form, Field, Toast } from 'react-native-system-ui'

export default function FormListDemo() {
  const formRef = Form.useForm()

  return (
    <Form
      ref={formRef}
      initialValues={{ users: [{ name: '', age: '' }] }}
      onFinish={values => Toast.info(JSON.stringify(values))}
      style={{ paddingHorizontal: 12 }}
      footer={(
        <Button
          round
          block
          type="primary"
          text="提交"
          onPress={() => formRef.current?.submit()}
          style={{ marginTop: 12 }}
        />
      )}
    >
      <Form.List name="users">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, idx) => (
              <View key={field.key} style={{ marginBottom: 24 }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#969799',
                    paddingVertical: 12,
                    lineHeight: 16,
                  }}
                >
                  用户 {idx + 1}
                </Text>
                <Form.Item name={[field.name, 'name']}>
                  <Field label="姓名" placeholder="请输入姓名" clearable />
                </Form.Item>
                <Form.Item name={[field.name, 'age']}>
                  <Field label="年龄" placeholder="请输入年龄" clearable />
                </Form.Item>
                <Button
                  size="small"
                  type="danger"
                  text="删除"
                  onPress={() => remove(idx)}
                  style={{ marginTop: 8 }}
                />
              </View>
            ))}
            <Button
              plain
              block
              icon={<AddO size={16} />}
              text="新增用户"
              onPress={() => add({ name: '', age: '' })}
            />
          </>
        )}
      </Form.List>
    </Form>
  )
}
