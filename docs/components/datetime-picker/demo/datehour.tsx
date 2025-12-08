import React from 'react'
import { DatetimePicker } from 'react-native-system-ui'
import { View, Text } from 'react-native'

export default function DatetimePickerDatehourDemo() {
  const [value, setValue] = React.useState(new Date())

  return (
    <View style={{ gap: 12 }}>
      <Text>送达时间（年月日+小时）：{value.toLocaleString()}</Text>
      <DatetimePicker
        type="datehour"
        value={value}
        onChange={setValue}
        minDate={new Date(2025, 0, 1)}
        maxDate={new Date(2025, 11, 31)}
      />
    </View>
  )
}
