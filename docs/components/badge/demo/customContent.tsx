import React from 'react'
import { View } from 'react-native'

import { Badge, Space } from 'react-native-system-ui'
import { Arrow, Checked, Close as CloseIcon } from 'react-native-system-icon'

const Box = () => (
  <View
    style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: '#f2f3f5' }}
  />
)

export default () => (
  <Space gap={20}>
    <Badge content={<Checked size={12} fill="#fff" color="#fff" />}>
      <Box />
    </Badge>
    <Badge content={<CloseIcon size={12} fill="#fff" color="#fff" />}>
      <Box />
    </Badge>
    <Badge content={<Arrow size={12} fill="#fff" color="#fff" />}>
      <Box />
    </Badge>
  </Space>
)
