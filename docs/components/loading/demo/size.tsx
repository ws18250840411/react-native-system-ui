import React from 'react'

import { Loading, Space } from 'react-native-system-ui'
import { DemoCard } from '../../common/DemoCard'

export default () => (
  <DemoCard>
    <Space gap={24}>
      <Loading size={20} />
      <Loading size={36} type="spinner" />
    </Space>
  </DemoCard>
)
