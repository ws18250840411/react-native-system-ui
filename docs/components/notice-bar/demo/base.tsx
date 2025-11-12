import React from 'react'

import { Icon, NoticeBar } from 'react-native-system-ui'

export default () => (
  <NoticeBar
    scrollable
    leftIcon={<Icon name="info" size={16} color="#f97316" />}
    text="技术是开发它的人的共同灵魂，在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
  />
)
