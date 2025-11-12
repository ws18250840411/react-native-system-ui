import React from 'react'

import { Progress, Space } from 'react-native-system-ui'

export default () => (
  <Space direction="vertical" gap={12}>
    <Progress percentage={50} inactive />
    <Progress percentage={30} inactive showPivot={false} />
  </Space>
)
