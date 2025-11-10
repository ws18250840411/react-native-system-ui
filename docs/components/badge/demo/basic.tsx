import React from 'react'
import { View } from 'react-native'

import { Badge, Space } from 'react-native-system-ui'
import { DemoCard } from '../../common/DemoCard'

const Box = () => (
  <View
    style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: '#f2f3f5' }}
  />
)

export default () => (
  <DemoCard>
    <Space gap={20}>
      <Badge content={5}>
        <Box />
      </Badge>
      <Badge content={10}>
        <Box />
      </Badge>
      <Badge content="hot">
        <Box />
      </Badge>
      <Badge dot>
        <Box />
      </Badge>
    </Space>
  </DemoCard>
)
