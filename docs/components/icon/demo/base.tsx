import React from 'react'

import { Icon, Space } from 'react-native-system-ui'
import { DemoCard } from '../../common/DemoCard'

export default () => (
  <DemoCard>
    <Space gap={16}>
      <Icon name="close" />
      <Icon name="check" />
      <Icon name="warning" />
      <Icon name="info" />
    </Space>
  </DemoCard>
)
