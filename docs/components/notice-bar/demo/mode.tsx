import React from 'react'

import { NoticeBar } from 'react-native-system-ui'

export default function NoticeBarModeDemo() {
  return (
  <>
    <NoticeBar mode="closeable">可关闭通知栏</NoticeBar>
    <NoticeBar mode="link" style={{ marginTop: 12 }}>
      链接模式通知栏
    </NoticeBar>
  </>
  )
}
