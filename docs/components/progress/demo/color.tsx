import React from 'react'

import { Progress, Space } from 'react-native-system-ui'

export default function ProgressColorDemo() {
  return (
  <Space direction="vertical" gap={12}>
    <Progress percentage={25} color="#f97316" pivotText="橙色" />
    <Progress percentage={50} color="#ef4444" pivotText="红色" />
    <Progress percentage={75} showPivot={false} color="#8b5cf6" />
  </Space>
  )
}
