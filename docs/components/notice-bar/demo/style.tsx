import React from 'react'

import { Info } from 'react-native-system-icon'
import { NoticeBar } from 'react-native-system-ui'

export default function NoticeBarStyleDemo() {
  return (
  <NoticeBar
    color="#2563eb"
    background="#e0edff"
    leftIcon={<Info size={16} fill="#2563eb" color="#2563eb" />}
  >
    自定义颜色通知栏
  </NoticeBar>
  )
}
