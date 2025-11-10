import React from 'react'

import { NoticeBar } from 'react-native-system-ui'
import { DemoCard } from '../../common/DemoCard'

export default () => (
  <DemoCard>
    <NoticeBar color="#2563eb" background="#e0edff">
      自定义颜色通知栏
    </NoticeBar>
  </DemoCard>
)
