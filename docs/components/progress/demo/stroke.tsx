import React from 'react'

import { Progress, Space } from 'react-native-system-ui'
import { DemoCard } from '../../common/DemoCard'

export default () => (
  <DemoCard>
    <Space direction="vertical" gap={12}>
      <Progress percentage={30} strokeWidth={4} />
      <Progress percentage={60} strokeWidth={8} />
    </Space>
  </DemoCard>
)
