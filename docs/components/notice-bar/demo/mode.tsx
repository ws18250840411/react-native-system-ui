import React from 'react'

import { NoticeBar, Space } from 'react-native-system-ui'
import { DemoCard } from '../../common/DemoCard'

export default () => (
  <DemoCard>
    <Space direction="vertical" gap={12}>
      <NoticeBar mode="closeable">可关闭通知栏</NoticeBar>
      <NoticeBar mode="link">链接模式通知栏</NoticeBar>
    </Space>
  </DemoCard>
)
