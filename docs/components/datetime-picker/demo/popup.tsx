import React from 'react'
import { View } from 'react-native'
import { DatetimePicker, Field } from 'react-native-system-ui'

export default function DatetimePickerPopupDemo() {
  const [visible, setVisible] = React.useState(false)
  const [value, setValue] = React.useState(new Date())

  const handleConfirm = (val: Date) => {
    setValue(val)
    setVisible(false)
  }

  return (
    <View style={{ gap: 12 }}>
      <Field
        readOnly
        clickable
        label="选择时间"
        value={value.toLocaleString()}
        placeholder="请选择时间"
        onClick={() => setVisible(true)}
      />
      <DatetimePicker
        popup
        popupVisible={visible}
        onPopupVisibleChange={setVisible}
        type="datetime"
        value={value}
        onChange={setValue}
        onConfirm={handleConfirm}
        onCancel={() => setVisible(false)}
        showToolbar
      />
    </View>
  )
}
