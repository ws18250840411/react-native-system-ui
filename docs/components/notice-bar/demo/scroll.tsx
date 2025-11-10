import React from 'react'

import { NoticeBar } from 'react-native-system-ui'
import { DemoCard } from '../../common/DemoCard'

const text = '在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。'

export default () => (
  <DemoCard>
    <NoticeBar text={text} scrollable />
  </DemoCard>
)
