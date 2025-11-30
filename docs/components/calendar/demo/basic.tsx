import React from "react"
import { Calendar } from "react-native-system-ui"
import { View, Text } from "react-native"

export default function CalendarBasicDemo() {
  const [value, setValue] = React.useState<Date>(new Date())

  return (
    <View style={{ gap: 12 }}>
      <Text>当前选择：{value.toDateString()}</Text>
      <Calendar value={value} onSelect={val => setValue(val as Date)} showConfirm={false} />
    </View>
  )
}
