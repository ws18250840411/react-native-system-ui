import React from 'react'

import { Icon, NoticeBar } from 'react-native-system-ui'

export default () => (
  <NoticeBar
    color="#2563eb"
    background="#e0edff"
    leftIcon={<Icon name="info" size={16} color="#2563eb" />}
  >
    自定义颜色通知栏
  </NoticeBar>
)
