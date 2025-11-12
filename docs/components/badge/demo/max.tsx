import React from 'react'
import { View } from 'react-native'

import { Badge, Space } from 'react-native-system-ui'

const Box = () => (
  <View
    style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: '#f2f3f5' }}
  />
)

export default () => (
  <Space gap={20}>
    <Badge content={20} max={9}>
      <Box />
    </Badge>
    <Badge content="99" max="20">
      <Box />
    </Badge>
    <Badge content="9999" max="99">
      <Box />
    </Badge>
  </Space>
)
