import React from 'react'
import { DatetimePicker } from 'react-native-system-ui'
import { View, Text } from 'react-native'

export default function DatetimePickerMonthDayDemo() {
  const [value, setValue] = React.useState(new Date())

  return (
    <View style={{ gap: 12 }}>
      <Text>生日：{value.getMonth() + 1} 月 {value.getDate()} 日</Text>
      <DatetimePicker
        type="month-day"
        value={value}
        onChange={setValue}
        minDate={new Date(2025, 0, 1)}
        maxDate={new Date(2025, 11, 31)}
      />
    </View>
  )
}
