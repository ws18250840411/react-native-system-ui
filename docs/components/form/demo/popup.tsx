import React from 'react'

import {
  Button,
  Calendar,
  DatetimePicker,
  Field,
  Form,
  Picker,
  Popup,
  Toast,
  type PickerOption,
} from 'react-native-system-ui'

const cityColumns: PickerOption[] = [
  { label: '南京', value: '南京' },
  { label: '苏州', value: '苏州' },
  { label: '常州', value: '常州' },
  { label: '淮安', value: '淮安' },
  { label: '扬州', value: '扬州' },
  { label: '南通', value: '南通' },
  { label: '宿迁', value: '宿迁' },
  { label: '泰州', value: '泰州' },
  { label: '无锡', value: '无锡' },
]

const Fields: React.FC<{ formRef: ReturnType<typeof Form.useForm> }> = ({ formRef }) => {
  const [cityVisible, setCityVisible] = React.useState(false)
  const [dateVisible, setDateVisible] = React.useState(false)
  const [calendarVisible, setCalendarVisible] = React.useState(false)

  const city = Form.useWatch('city', formRef) as string | undefined
  const date = Form.useWatch('date', formRef) as Date | undefined
  const calendar = Form.useWatch('calendar', formRef) as Date | undefined

  const formatDate = (val?: Date) => (val ? new Date(val).toLocaleDateString() : '')

  return (
    <>
      <Form.Item name="city" label="城市">
        <Field
          readOnly
          clickable
          isLink
          value={city ? String(city) : ''}
          placeholder="请选择城市"
          onClick={() => setCityVisible(true)}
        />
      </Form.Item>

      <Form.Item name="date" label="日期">
        <Field
          readOnly
          clickable
          isLink
          value={formatDate(date)}
          placeholder="请选择日期"
          onClick={() => setDateVisible(true)}
        />
      </Form.Item>

      <Form.Item name="calendar" label="日历">
        <Field
          readOnly
          clickable
          isLink
          value={formatDate(calendar)}
          placeholder="请选择日期"
          onClick={() => setCalendarVisible(true)}
          border={false}
        />
      </Form.Item>

      <Popup
        visible={cityVisible}
        placement="bottom"
        round
        onClose={() => setCityVisible(false)}
      >
        <Picker
          title="城市选择"
          columns={cityColumns}
          value={city}
          onConfirm={vals => {
            formRef.current?.setFieldsValue({ city: vals[0] })
            setCityVisible(false)
          }}
          onCancel={() => setCityVisible(false)}
        />
      </Popup>

      <DatetimePicker
        popup
        popupVisible={dateVisible}
        onPopupVisibleChange={setDateVisible}
        type="date"
        value={date ?? new Date()}
        onConfirm={val => formRef.current?.setFieldsValue({ date: val })}
        onCancel={() => setDateVisible(false)}
        showToolbar
      />

      <Calendar
        poppable
        visible={calendarVisible}
        onVisibleChange={setCalendarVisible}
        value={calendar}
        onConfirm={val => {
          const next = Array.isArray(val) ? val[0] : val
          formRef.current?.setFieldsValue({ calendar: next })
        }}
      />
    </>
  )
}

export default function FormPopupDemo() {
  const formRef = Form.useForm()

  return (
    <Form
      ref={formRef}
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
      <Fields formRef={formRef} />
    </Form>
  )
}
