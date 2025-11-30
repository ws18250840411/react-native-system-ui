import React from "react"
import { Calendar } from "react-native-system-ui"
import { View, Text } from "react-native"

export default function CalendarRangeDemo() {
  const [value, setValue] = React.useState<Date[]>([])

  return (
    <View style={{ gap: 12 }}>
      <Text>
        选择范围：
        {value.length === 2 ? `${value[0].toDateString()} - ${value[1].toDateString()}` : "未选择"}
      </Text>
      <Calendar type="range" value={value} onSelect={val => setValue(val as Date[])} />
    </View>
  )
}
