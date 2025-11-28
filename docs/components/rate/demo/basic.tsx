import React from 'react'
import { Rate } from 'react-native-system-ui'
import { View, Text } from 'react-native'

export default function RateBasicDemo() {
  const [value, setValue] = React.useState(3)
  return (
    <View style={{ gap: 12 }}>
      <Text>当前评分：{value}</Text>
      <Rate value={value} onChange={setValue} />
    </View>
  )
}
