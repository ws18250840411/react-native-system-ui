import React from 'react'
import { View } from 'react-native'

import { Badge, Icon, Space } from 'react-native-system-ui'

const Box = () => (
  <View
    style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: '#f2f3f5' }}
  />
)

export default () => (
  <Space gap={20}>
    <Badge content={<Icon name="check" size={12} color="#fff" />}>
      <Box />
    </Badge>
    <Badge content={<Icon name="close" size={12} color="#fff" />}>
      <Box />
    </Badge>
    <Badge content={<Icon name="arrow-right" size={12} color="#fff" />}>
      <Box />
    </Badge>
  </Space>
)
