import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerFormatterDemo() {
  const [value, setValue] = React.useState(new Date())

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker
        type="datetime"
        value={value}
        onChange={setValue}
        formatter={(type, val) => {
          switch (type) {
            case 'year':
              return `${val}年`
            case 'month':
              return `${val}月`
            case 'day':
              return `${val}日`
            case 'hour':
              return `${val}时`
            case 'minute':
              return `${val}分`
            default:
              return val
          }
        }}
      />
    </View>
  )
}
