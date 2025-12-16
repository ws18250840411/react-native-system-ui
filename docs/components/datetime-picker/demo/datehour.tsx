import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerDatehourDemo() {
  const [value, setValue] = React.useState(new Date())

  return (
    <View style={{ gap: 12 }}>
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
