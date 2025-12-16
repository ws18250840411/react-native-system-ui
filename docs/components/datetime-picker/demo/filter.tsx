import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerFilterDemo() {
  const [value, setValue] = React.useState('09:30')

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker
        type="time"
        value={value}
        onChange={setValue}
        filter={(type, values) =>
          type === 'minute' ? values.filter(v => Number(v) % 2 === 0) : values
        }
      />
    </View>
  )
}
