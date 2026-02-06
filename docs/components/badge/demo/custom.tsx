import React from 'react'
import { View } from 'react-native'

import { Badge, Space } from 'react-native-system-ui'

const Box = () => (
  <View
    style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: '#f2f3f5' }}
  />
)

export default function BadgeCustomDemo() {
  return (
  <Space gap={20}>
    <Badge dot offset={[12, 0]}>
      <Box />
    </Badge>
    <Badge dot color="#22c55e">
      <Box />
    </Badge>
    <Badge dot offset={[0, '100%']} color="#3f45ff">
      <Box />
    </Badge>
    <Badge dot offset={['100%', '100%']} color="orange">
      <Box />
    </Badge>
  </Space>
  )
}
