import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerYearMonthDemo() {
  const [value, setValue] = React.useState(new Date())

  return (
    <View style={{ gap: 12 }}>
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
