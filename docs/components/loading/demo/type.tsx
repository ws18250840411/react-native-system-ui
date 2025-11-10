import React from 'react'

import { Loading, Space } from 'react-native-system-ui'
import { DemoCard } from '../../common/DemoCard'

export default () => (
  <DemoCard>
    <Space gap={24}>
      <Loading />
      <Loading type="spinner" />
    </Space>
  </DemoCard>
)
