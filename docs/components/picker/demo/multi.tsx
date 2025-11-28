import React from 'react'
import { Picker } from 'react-native-system-ui'
import { View, Text } from 'react-native'

const columns = [
  [
    { label: '上午', value: 'am' },
    { label: '下午', value: 'pm' },
  ],
  [
    { label: '北京', value: 'bj' },
    { label: '上海', value: 'sh' },
    { label: '深圳', value: 'sz' },
  ],
]

export default function PickerMultiDemo() {
  const [value, setValue] = React.useState(['am', 'bj'])
  const handleConfirm = (next: string[]) => {
    setValue(next)
  }
  return (
    <View style={{ gap: 16 }}>
      <Text>选择时间段与城市</Text>
      <Picker
        columns={columns}
        value={value}
        onConfirm={(val) => handleConfirm(val as string[])}
        onChange={(val) => setValue(val as string[])}
      />
    </View>
  )
}
