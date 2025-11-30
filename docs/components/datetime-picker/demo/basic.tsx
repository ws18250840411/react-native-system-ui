import React from "react"
import { DatetimePicker } from "react-native-system-ui"
import { View, Text } from "react-native"

export default function DatetimePickerBasicDemo() {
  const [value, setValue] = React.useState(new Date())

  return (
    <View style={{ gap: 12 }}>
      <Text>选择日期：{value.toDateString()}</Text>
      <DatetimePicker type="date" value={value} onChange={setValue} />
    </View>
  )
}
