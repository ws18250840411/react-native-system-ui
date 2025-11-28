import React from 'react'
import { Selector } from 'react-native-system-ui'
import { View, Text } from 'react-native'

const options = [
  { label: '上午', value: 'am' },
  { label: '下午', value: 'pm', disabled: true },
  { label: '晚上', value: 'night' },
]

export default function SelectorDisabledDemo() {
  return (
    <View style={{ gap: 16 }}>
      <Text>禁用整体</Text>
      <Selector options={options} disabled defaultValue={['am']} />
      <Text>禁用单独选项</Text>
      <Selector options={options} defaultValue={['am']} />
    </View>
  )
}
