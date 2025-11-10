import React from 'react'

import { Badge, Space } from 'react-native-system-ui'
import { DemoCard } from '../../common/DemoCard'

export default () => (
  <DemoCard>
    <Space gap={12}>
      <Badge content="20" />
      <Badge content="200" max="99" />
      <Badge dot color="#f97316" />
    </Space>
  </DemoCard>
)
