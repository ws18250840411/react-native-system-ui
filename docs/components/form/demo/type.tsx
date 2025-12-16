import React from 'react'

import {
  Button,
  Checkbox,
  Field,
  Form,
  Radio,
  Rate,
  Slider,
  Stepper,
  Switch,
  Toast,
  Uploader,
} from 'react-native-system-ui'

export default function FormTypeDemo() {
  const formRef = Form.useForm()

  return (
    <Form
      ref={formRef}
      initialValues={{
        switch: true,
        checkbox: true,
        checkbox_group: ['a', 'b'],
        radio: 'a',
        rate: 3,
        slider: 25,
        stepper: 1,
      }}
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
      <Form.Item name="switch" label="开关" valuePropName="checked" trigger="onChange">
        <Switch size={20} />
      </Form.Item>

      <Form.Item name="checkbox" label="复选框" valuePropName="checked" trigger="onChange">
        <Checkbox shape="square">复选框</Checkbox>
      </Form.Item>

      <Form.Item name="checkbox_group" label="复选框组" valuePropName="value" trigger="onChange">
        <Checkbox.Group direction="horizontal">
          <Checkbox shape="square" name="a">复选框a</Checkbox>
          <Checkbox shape="square" name="b">复选框b</Checkbox>
          <Checkbox shape="square" name="c">复选框c</Checkbox>
        </Checkbox.Group>
      </Form.Item>

      <Form.Item name="radio" label="单选框" valuePropName="value" trigger="onChange">
        <Radio.Group direction="horizontal">
          <Radio name="a">单选框a</Radio>
          <Radio name="b">单选框b</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item name="stepper" label="步进器" valuePropName="value" trigger="onChange">
        <Stepper />
      </Form.Item>

      <Form.Item name="rate" label="评分" valuePropName="value" trigger="onChange">
        <Rate />
      </Form.Item>

      <Form.Item name="slider" label="滑块" valuePropName="value" trigger="onChange">
        <Slider />
      </Form.Item>

      <Form.Item name="uploader" label="上传文件" valuePropName="value" trigger="onChange">
        <Uploader />
      </Form.Item>

      <Form.Item name="textarea" label="详细地址">
        <Field placeholder="请输入详细地址" type="textarea" rows={3} showWordLimit maxLength={140} border={false} />
      </Form.Item>
    </Form>
  )
}
