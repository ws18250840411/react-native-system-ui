import React from 'react'

import { Space, Typography } from 'react-native-system-ui'

export default () => (
  <Space direction="vertical" gap={8}>
    <Typography.Text size="xs">超小文本</Typography.Text>
    <Typography.Text size="sm">小号文本</Typography.Text>
    <Typography.Text size="md">默认文本</Typography.Text>
    <Typography.Text size="lg">大号文本</Typography.Text>
    <Typography.Text size="xl" strong>
      超大文本
    </Typography.Text>
  </Space>
)
