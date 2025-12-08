import React from 'react'
import { DatetimePicker } from 'react-native-system-ui'
import { View, Text } from 'react-native'

export default function DatetimePickerYearMonthDemo() {
  const [value, setValue] = React.useState(new Date())

  return (
    <View style={{ gap: 12 }}>
      <Text>计费周期：{value.getFullYear()}年{value.getMonth() + 1}月</Text>
      <DatetimePicker
        type="year-month"
        value={value}
        onChange={setValue}
        minDate={new Date(2024, 0, 1)}
        maxDate={new Date(2026, 11, 1)}
      />
    </View>
  )
}
