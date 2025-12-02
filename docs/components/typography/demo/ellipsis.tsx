import React from 'react'

import { Divider, Typography } from 'react-native-system-ui'
import './style.css'

const content =
  'React Native System UI 追求 react-vant 的体验一致性，同时尊重移动端的交互习惯，提供丰富的基础组件和排版样式，欢迎一起共建。'

export default () => (
  <div className="demo-typography__ellipsis">
    <Typography.Text ellipsis>{content}</Typography.Text>
    <Divider>多行省略</Divider>
    <Typography.Text ellipsis={2}>{content}</Typography.Text>
    <Divider>展开 / 收起</Divider>
    <Typography.Text ellipsis={{ rows: 2, expandText: '展开', collapseText: '收起' }}>
      {content}
    </Typography.Text>
  </div>
)
