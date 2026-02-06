import React from 'react'
import { NoticeBar } from 'react-native-system-ui'

const messages = ['内容 1', '内容 2', '内容 3']

export default function NoticeBarVerticalDemo() {
  return <NoticeBar direction="vertical" items={messages} />
}
