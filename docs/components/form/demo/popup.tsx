import React from "react"
import { Button, Calendar, DatetimePicker, Form, Picker } from "react-native-system-ui"

export default function FormPopupDemo() {
  const formRef = Form.useForm()
  const [pickerVisible, setPickerVisible] = React.useState(false)
  const [dateVisible, setDateVisible] = React.useState(false)
  const [calendarVisible, setCalendarVisible] = React.useState(false)

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
      <Form.Item
        isLink
        name="picker"
        label="城市选择"
        trigger="onConfirm"
        valuePropName="value"
        onClick={() => setPickerVisible(true)}
      >
        <Picker
          popup
          popupVisible={pickerVisible}
          onPopupVisibleChange={setPickerVisible}
          columns={["南京", "苏州", "常州", "淮安", "扬州", "南通", "宿迁", "泰州", "无锡"]}
        >
          {(val?: string) => val || "请选择城市"}
        </Picker>
      </Form.Item>

      <Form.Item
        isLink
        name="date"
        label="日期选择"
        trigger="onConfirm"
        valuePropName="value"
        onClick={() => setDateVisible(true)}
      >
        <DatetimePicker
          popup
          popupVisible={dateVisible}
          onPopupVisibleChange={setDateVisible}
          type="date"
        >
          {(val?: Date) => (val ? val.toDateString() : "请选择日期")}
        </DatetimePicker>
      </Form.Item>

      <Form.Item
        isLink
        name="calendar"
        label="日历选择"
        trigger="onConfirm"
        valuePropName="value"
        onClick={() => setCalendarVisible(true)}
      >
        <Calendar
          popup
          popupVisible={calendarVisible}
          onPopupVisibleChange={setCalendarVisible}
        >
          {(val?: Date) => (val ? val.toDateString() : "请选择日历")}
        </Calendar>
      </Form.Item>
    </Form>
  )
}
