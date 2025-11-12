import React from 'react'

import { Icon, NoticeBar } from 'react-native-system-ui'

const text = '在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。'

export default () => (
  <NoticeBar
    text={text}
    wrapable
    scrollable={false}
    leftIcon={<Icon name="info" size={16} color="#f97316" />}
  />
)
