import React from 'react'

import { Typography } from 'react-native-system-ui'

const content = 'React Native System UI 追求极致的排版体验，同时照顾移动端特性。'

export default () => (
  <Typography.Text>
    {content}
    <Typography.Text type="danger"> 内部版本</Typography.Text>
    <Typography.Text delete> 桌面规范 </Typography.Text>
    <Typography.Text type="primary">提供了大量</Typography.Text>
    <Typography.Text underline> 通用实现 </Typography.Text>
    <Typography.Text type="warning">欢迎一起参与。</Typography.Text>
  </Typography.Text>
)
