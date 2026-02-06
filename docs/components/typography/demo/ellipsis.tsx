import React from 'react'

import { Divider, Space, Typography } from 'react-native-system-ui'

const content =
  'React Native System UI 追求跨平台的一致体验，同时尊重移动端的交互习惯，提供丰富的基础组件和排版样式，欢迎一起共建。'

export default function TypographyEllipsisDemo() {
  return (
  <Space direction="vertical" gap={12}>
    <Typography.Text ellipsis>{content}</Typography.Text>
    <Divider style={{ marginVertical: 4 }}>多行省略</Divider>
    <Typography.Text ellipsis={2}>{content}</Typography.Text>
    <Divider style={{ marginVertical: 4 }}>展开 / 收起</Divider>
    <Typography.Text ellipsis={{ rows: 2, expandText: '展开', collapseText: '收起' }}>
      {content}
    </Typography.Text>
  </Space>
  )
}
