import React from 'react'
import { DatetimePicker } from 'react-native-system-ui'
import { View, Text } from 'react-native'

export default function DatetimePickerFilterDemo() {
  const [value, setValue] = React.useState('09:30')

  return (
    <View style={{ gap: 12 }}>
      <Text>只可选偶数分钟：{value}</Text>
      <DatetimePicker
        type="time"
        value={value}
        onChange={setValue}
        filter={(type, values) => (type === 'minute' ? values.filter(v => Number(v) % 2 === 0) : values)}
      />
    </View>
  )
}
