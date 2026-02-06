import React from 'react'

import { Space, Typography } from 'react-native-system-ui'

export default function TypographyTypeDemo() {
  return (
  <Space direction="vertical" gap={8}>
    <Typography.Text type="primary">Primary 文本</Typography.Text>
    <Typography.Text type="success">Success 文本</Typography.Text>
    <Typography.Text type="warning">Warning 文本</Typography.Text>
    <Typography.Text type="danger">Danger 文本</Typography.Text>
    <Typography.Text type="secondary">Secondary 文本</Typography.Text>
    <Typography.Text
      type="light"
      style={{
        backgroundColor: '#111f2c',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 8,
      }}
    >
      Light 文本
    </Typography.Text>
    <Typography.Text type="secondary" disabled>
      Disabled 文本
    </Typography.Text>
  </Space>
  )
}
