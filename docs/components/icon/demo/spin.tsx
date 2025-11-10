import React from 'react'

import { Icon, Space } from 'react-native-system-ui'
import { DemoCard } from '../../common/DemoCard'

export default () => (
  <DemoCard>
    <Space gap={24}>
      <Icon name="loading" spin />
      <Icon name="loading" spin color="#3b82f6" />
      <Icon name="loading" spin rotate={90} />
    </Space>
  </DemoCard>
)
