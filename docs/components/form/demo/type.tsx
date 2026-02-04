import React from 'react'
import { View, Text } from 'react-native'

import {
  Button,
  Cell,
  Checkbox,
  Field,
  Form,
  Radio,
  Slider,
  Space,
  Stepper,
  Switch,
  Toast,
} from 'react-native-system-ui'

const GroupTitle = ({ title }: { title: string }) => (
  <Text
    style={{
      fontSize: 14,
      color: '#969799',
      paddingVertical: 12,
      lineHeight: 16,
    }}
  >
    {title}
  </Text>
)

export default function FormTypeDemo() {
  const formRef = Form.useForm()

  return (
    <Form
      ref={formRef}
      style={{ paddingHorizontal: 12 }}
      initialValues={{
        switch: true,
        checkbox: true,
        checkbox_group: ['a', 'b'],
        radio: 'a',
        slider: 25,
        stepper: 1,
      }}
      onFinish={values => Toast.info(JSON.stringify(values))}
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
      <View>
        <Cell title="开关" style={{ paddingHorizontal: 0, backgroundColor: 'transparent' }}>
          <Form.Item name="switch" valuePropName="checked" trigger="onChange">
            <Switch size={24} />
          </Form.Item>
        </Cell>

        <Cell title="步进器" style={{ paddingHorizontal: 0, backgroundColor: 'transparent' }}>
          <Form.Item name="stepper" valuePropName="value" trigger="onChange">
            <Stepper />
          </Form.Item>
        </Cell>

        <Cell title="滑块" border={false} style={{ paddingHorizontal: 0, backgroundColor: 'transparent' }}>
          <Form.Item name="slider" valuePropName="value" trigger="onChange">
            <Slider style={{ width: 200 }} />
          </Form.Item>
        </Cell>
      </View>

      <View>
        <Cell title="复选框" style={{ paddingHorizontal: 0, backgroundColor: 'transparent' }}>
          <Form.Item name="checkbox" valuePropName="checked" trigger="onChange">
            <Checkbox shape="square">复选框</Checkbox>
          </Form.Item>
        </Cell>

        <Cell title="复选框组" style={{ paddingHorizontal: 0, backgroundColor: 'transparent' }}>
          <Form.Item name="checkbox_group" valuePropName="value" trigger="onChange">
            <Checkbox.Group direction="horizontal">
              <Space gap={12}>
                <Checkbox shape="square" name="a">复选框a</Checkbox>
                <Checkbox shape="square" name="b">复选框b</Checkbox>
              </Space>
            </Checkbox.Group>
          </Form.Item>
        </Cell>

        <Cell title="单选框" border={false} style={{ paddingHorizontal: 0, backgroundColor: 'transparent' }}>
          <Form.Item name="radio" valuePropName="value" trigger="onChange">
            <Radio.Group direction="horizontal">
              <Space gap={12}>
                <Radio name="a">单选框a</Radio>
                <Radio name="b">单选框b</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
        </Cell>
      </View>

      <View>
        <Form.Item name="textarea" label="详细地址">
          <Field
            placeholder="请输入详细地址"
            type="textarea"
            rows={3}
            showWordLimit
            maxLength={140}
            border={false}
            style={{ paddingHorizontal: 0 }}
          />
        </Form.Item>
      </View>
    </Form>
  )
}
