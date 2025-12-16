import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerTimeDemo() {
  const [value, setValue] = React.useState('09:30')

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker
        type="time"
        value={value}
        onChange={setValue}
        minHour={8}
        maxHour={20}
      />
    </View>
  )
}
