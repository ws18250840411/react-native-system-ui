import React from 'react'
import { View, Text } from 'react-native'
import { DatetimePicker, Button } from 'react-native-system-ui'

export default function DatetimePickerPopupDemo() {
  const [visible, setVisible] = React.useState(false)
  const [value, setValue] = React.useState(new Date())

  const handleConfirm = (val: Date) => {
    setValue(val)
    setVisible(false)
  }

  return (
    <View style={{ gap: 12 }}>
      <Text>当前选择：{value.toLocaleString()}</Text>
      <Button type="primary" onPress={() => setVisible(true)}>
        打开弹层选择
      </Button>
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
