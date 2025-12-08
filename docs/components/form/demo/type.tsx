import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import {
  Button,
  Calendar,
  Checkbox,
  DatetimePicker,
  Field,
  Form,
  Picker,
  Radio,
  Rate,
  Slider,
  Stepper,
  Switch,
  Uploader,
} from 'react-native-system-ui'

export default function FormTypeDemo() {
  const formRef = Form.useForm()
  const [pickerVisible, setPickerVisible] = React.useState(false)
  const [dateVisible, setDateVisible] = React.useState(false)
  const [calendarVisible, setCalendarVisible] = React.useState(false)

  return (
    <View style={styles.wrapper}>
      <Form
        ref={formRef}
        initialValues={{ checkbox_group: ['c1', 'c2'], rate: 3, slider: 25, stepper: 1 }}
      >
        <Form.Item name="switch" label="开关" valuePropName="checked">
          <Switch size={20} />
        </Form.Item>

        <Form.Item name="checkbox" label="复选框" valuePropName="checked">
          <Checkbox shape="square" />
        </Form.Item>

        <Form.Item name="checkbox_group" label="复选框组" valuePropName="value" trigger="onChange">
          <Checkbox.Group direction="horizontal">
            <Checkbox shape="square" name="c1">复选框1</Checkbox>
            <Checkbox shape="square" name="c2">复选框2</Checkbox>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item name="radio" label="单选框" valuePropName="value" trigger="onChange">
          <Radio.Group direction="horizontal">
            <Radio name="r1">单选框1</Radio>
            <Radio name="r2">单选框2</Radio>
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

        <Form.Item
          isLink
          name="picker"
          label="城市选择"
          trigger="onConfirm"
          valuePropName="value"
        >
          <Picker
            popup
            popupVisible={pickerVisible}
            onPopupVisibleChange={setPickerVisible}
            columns={['南京', '苏州', '常州', '淮安', '扬州', '南通', '宿迁', '泰州', '无锡']}
          >
            {(val: string) => val || '请选择城市'}
          </Picker>
        </Form.Item>

        <Form.Item
          isLink
          name="date"
          label="日期选择"
          trigger="onConfirm"
          valuePropName="value"
        >
          <DatetimePicker
            popup
            popupVisible={dateVisible}
            onPopupVisibleChange={setDateVisible}
            type="date"
          >
            {(val?: Date) => (val ? val.toDateString() : '请选择日期')}
          </DatetimePicker>
        </Form.Item>

        <Form.Item
          isLink
          name="calendar"
          label="日历选择"
          trigger="onConfirm"
          valuePropName="value"
        >
          <Calendar
            popup
            popupVisible={calendarVisible}
            onPopupVisibleChange={setCalendarVisible}
          >
            {(val?: Date) => (val ? val.toDateString() : '请选择日历')}
          </Calendar>
        </Form.Item>

        <Form.Item name="uploader" label="上传文件" valuePropName="value" trigger="onChange">
          <Uploader />
        </Form.Item>

        <Form.Item name="textarea" label="详细地址">
          <Field placeholder="请输入详细地址" type="textarea" rows={3} showWordLimit maxLength={140} />
        </Form.Item>

        <View style={styles.footer}>
          <Button round block type="primary" text="提交" onPress={() => formRef.current?.submit()} />
        </View>
      </Form>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 12,
    backgroundColor: '#f7f8fa',
    borderRadius: 12,
    gap: 8,
  },
  footer: {
    marginTop: 16,
    paddingHorizontal: 4,
  },
})
