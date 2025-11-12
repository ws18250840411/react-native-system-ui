import React from 'react'

import { Typography } from 'react-native-system-ui'

const longText = 'React Native System UI 追求 react-vant 的体验一致性，同时尊重移动端的交互习惯，支持丰富的排版样式。'

export default () => (
  <Typography.Text ellipsis={{ rows: 2, expandText: '展开', collapseText: '收起' }}>
    {longText}
  </Typography.Text>
)
