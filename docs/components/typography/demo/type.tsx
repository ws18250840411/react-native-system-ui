import React from 'react'

import { Space, Typography } from 'react-native-system-ui'
import { DemoCard } from '../../common/DemoCard'

export default () => (
  <DemoCard>
    <Space direction="vertical" gap={8}>
      <Typography.Text type="primary">Primary 文本</Typography.Text>
      <Typography.Text type="success">Success 文本</Typography.Text>
      <Typography.Text type="warning">Warning 文本</Typography.Text>
      <Typography.Text type="danger">Danger 文本</Typography.Text>
      <Typography.Text type="secondary">Secondary 文本</Typography.Text>
    </Space>
  </DemoCard>
)
