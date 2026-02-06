import React from 'react'
import { View } from 'react-native'

import { Space } from 'react-native-system-ui'

const Dot = ({ size = 24, color = '#3b82f6' }: { size?: number; color?: string }) => (
  <View
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      borderWidth: 2,
      borderColor: color,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <View style={{ width: size / 3, height: size / 3, backgroundColor: color, borderRadius: size / 6 }} />
  </View>
)

export default function IconCustomDemo() {
  return (
  <Space gap={20}>
    <Dot size={32} color="#ef4444" />
    <Dot size={32} color="#3f45ff" />
  </Space>
  )
}
