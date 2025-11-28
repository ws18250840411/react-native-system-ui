import React from 'react'
import { Selector } from 'react-native-system-ui'
import { View, Text } from 'react-native'

const options = [
  { label: '杭州', description: 'West Lake', value: 'hz' },
  { label: '成都', description: 'Hotpot', value: 'cd' },
  { label: '重庆', description: 'Spicy', value: 'cq' },
]

export default function SelectorBasicDemo() {
  const [value, setValue] = React.useState(['hz'])
  return (
    <View style={{ gap: 12 }}>
      <Text>当前选择：{value.join(', ')}</Text>
      <Selector options={options} value={value} onChange={setValue} />
    </View>
  )
}
