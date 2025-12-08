import React from 'react'
import { DatetimePicker } from 'react-native-system-ui'
import { View, Text } from 'react-native'

export default function DatetimePickerColumnsOrderDemo() {
  const [value, setValue] = React.useState(new Date())

  return (
    <View style={{ gap: 12 }}>
      <Text>自定义列顺序（先日后月）：{value.toDateString()}</Text>
      <DatetimePicker
        type="date"
        value={value}
        onChange={setValue}
        columnsOrder={['day', 'month', 'year']}
      />
    </View>
  )
}
