import React from "react"
import { DatetimePicker } from "react-native-system-ui"
import { View, Text } from "react-native"

export default function DatetimePickerTimeDemo() {
  const [value, setValue] = React.useState("09:30")

  return (
    <View style={{ gap: 12 }}>
      <Text>提醒时间：{value}</Text>
      <DatetimePicker type="time" value={value} onChange={setValue} minHour={8} maxHour={20} />
    </View>
  )
}
