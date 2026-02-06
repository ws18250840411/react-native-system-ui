import React from 'react'

import { Info } from 'react-native-system-icon'
import { NoticeBar } from 'react-native-system-ui'

const text = '在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。'

export default function NoticeBarWrapDemo() {
  return (
  <NoticeBar
    text={text}
    wrapable
    scrollable={false}
    leftIcon={<Info size={16} fill="#f97316" color="#f97316" />}
  />
  )
}
