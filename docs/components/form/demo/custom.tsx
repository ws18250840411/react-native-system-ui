import React from 'react'
import { View } from 'react-native'

import { Button, Field, Form, Picker, Popup, Space, Toast, type PickerOption } from 'react-native-system-ui'

interface MobileValue {
  prefix: string
  value: string
}

type MobileInputProps = {
  value?: MobileValue
  onChange?: (value: MobileValue) => void
}

const areaCodeColumns: PickerOption[] = [
  { label: '+86', value: '86' },
  { label: '+1', value: '1' },
  { label: '+81', value: '81' },
]

const MobileInput: React.FC<MobileInputProps> = ({ value = { prefix: '86', value: '' }, onChange }) => {
  const [visible, setVisible] = React.useState(false)

  const trigger = (partial: Partial<MobileValue>) => {
    onChange?.({ ...value, ...partial })
  }

  return (
    <>
      <Space align="center" gap={12}>
        <View style={{ flex: 0.55 }}>
          <Field
            readOnly
            clickable
            isLink
            value={`+${value.prefix}`}
            onClick={() => setVisible(true)}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Field
            value={value.value}
            placeholder="请输入手机号"
            onChangeText={val => trigger({ value: val })}
          />
        </View>
      </Space>

      <Popup
        visible={visible}
        placement="bottom"
        round
        onClose={() => setVisible(false)}
      >
        <Picker
          title="选择区号"
          columns={areaCodeColumns}
          value={value.prefix}
          onConfirm={vals => {
            trigger({ prefix: String(vals[0] ?? value.prefix) })
            setVisible(false)
          }}
          onCancel={() => setVisible(false)}
        />
      </Popup>
    </>
  )
}

export default function FormCustomDemo() {
  const formRef = Form.useForm()

  const checkMobile = (_: any, val?: MobileValue) => {
    if (val?.prefix && val?.value) return true
    return '请输入区号和手机号'
  }

  return (
    <Form
      ref={formRef}
      onFinish={values => Toast.info(JSON.stringify(values))}
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
        <Field placeholder="请输入姓名" />
      </Form.Item>

      <Form.Item
        name="mobile"
        label="手机号"
        initialValue={{ prefix: '86', value: '' }}
        rules={[{ validator: checkMobile }]}
        trigger="onChange"
        valuePropName="value"
      >
        <MobileInput />
      </Form.Item>
    </Form>
  )
}
