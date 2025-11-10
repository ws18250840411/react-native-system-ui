import React from 'react'

import { Loading, Space } from 'react-native-system-ui'
import { DemoCard } from '../../common/DemoCard'

export default () => (
  <DemoCard>
    <Space gap={24}>
      <Loading color="#3b82f6" />
      <Loading type="spinner" color="#f97316" />
    </Space>
  </DemoCard>
)
