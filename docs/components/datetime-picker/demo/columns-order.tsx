import React from 'react'
import { View } from 'react-native'
import { DatetimePicker } from 'react-native-system-ui'

export default function DatetimePickerColumnsOrderDemo() {
  const [value, setValue] = React.useState(new Date())

  return (
    <View style={{ gap: 12 }}>
      <DatetimePicker
        type="date"
        value={value}
        onChange={setValue}
        columnsOrder={['day', 'month', 'year']}
      />
    </View>
  )
}
