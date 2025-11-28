import React from 'react'
import { Rate } from 'react-native-system-ui'
import { View, Text } from 'react-native'

export default function RateStateDemo() {
  return (
    <View style={{ gap: 16 }}>
      <Text>只读</Text>
      <Rate readOnly defaultValue={4.5} allowHalf />
      <Text>禁用</Text>
      <Rate disabled defaultValue={3} />
    </View>
  )
}
