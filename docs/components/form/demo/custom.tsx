import React from "react"
import { ArrowDown } from "react-native-system-icon"
import { Button, Field, Form, Picker, Space } from "react-native-system-ui"

const columns = [
  { text: "86 🇨🇳", value: "86" },
  { text: "87 🇺🇸", value: "87" },
  { text: "88 🏳️‍🌈", value: "88" },
  { text: "89 🏳️‍⚧️", value: "89" },
]

interface MobileValue {
  prefix: string
  value: string
}

type MobileInputProps = {
  value?: MobileValue
  onChange?: (value: MobileValue) => void
}

const MobileInput: React.FC<MobileInputProps> = ({ value = { prefix: "86", value: "" }, onChange }) => {
  const trigger = (partial: Partial<MobileValue>) => {
    onChange?.({ ...value, ...partial })
  }

  return (
    <Space align="center">
      <Picker popup columns={columns} value={value.prefix} onConfirm={val => trigger({ prefix: val as string })}>
        {(_, selected, actions) => (
          <Space align="center" onPress={() => actions.open?.()}>
            <Field value={`+${selected?.text ?? value.prefix}`} readOnly />
            <ArrowDown />
          </Space>
        )}
      </Picker>
      <Field
        style={{ flex: 1 }}
        value={value.value}
        placeholder="请输入手机号"
        onChangeText={val => trigger({ value: val })}
      />
    </Space>
  )
}

export default function FormCustomDemo() {
  const formRef = Form.useForm()

  const checkMobile = (_: any, val?: MobileValue) => {
    if (val?.prefix && val?.value) return true
    return "请输入区号和手机号"
  }

  return (
    <Form
      ref={formRef}
      onFinish={values => console.log(values)}
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
      <Form.Item name="name" label="姓名">
        <Field placeholder="请输入用户姓名" />
      </Form.Item>

      <Form.Item
        name="mobile"
        label="手机号"
        initialValue={{ prefix: "86", value: "" }}
        rules={[{ required: true, message: "请选择区号" }, { validator: checkMobile }]}
        trigger="onChange"
        valuePropName="value"
      >
        <MobileInput />
      </Form.Item>
    </Form>
  )
}
