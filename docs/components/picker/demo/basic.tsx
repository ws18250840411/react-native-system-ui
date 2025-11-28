import React from 'react'
import { Picker } from 'react-native-system-ui'
import { View, Text } from 'react-native'

const columns = [
  [
    { label: '周一', value: 'mon' },
    { label: '周二', value: 'tue' },
    { label: '周三', value: 'wed' },
  ],
]

export default function PickerBasicDemo() {
  const [value, setValue] = React.useState(['mon'])
  return (
    <View style={{ gap: 12 }}>
      <Text>当前：{value.join(', ')}</Text>
      <Picker columns={columns} value={value} onChange={setValue} />
    </View>
  )
}
