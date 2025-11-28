import React from 'react'
import { Rate } from 'react-native-system-ui'
import { View, Text } from 'react-native'

export default function RateHalfDemo() {
  const [value, setValue] = React.useState(2.5)
  return (
    <View style={{ gap: 16 }}>
      <Text>允许半星，当前：{value}</Text>
      <Rate allowHalf value={value} onChange={setValue} color="#ffb200" />
      <Rate allowHalf defaultValue={1.5} voidColor="#eee" color="#ff6b00" />
    </View>
  )
}
