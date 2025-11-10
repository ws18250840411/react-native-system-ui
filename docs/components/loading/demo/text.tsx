import React from 'react'

import { Loading } from 'react-native-system-ui'
import { DemoCard } from '../../common/DemoCard'

export default () => (
  <DemoCard>
    <Loading size={24}>加载中...</Loading>
  </DemoCard>
)
