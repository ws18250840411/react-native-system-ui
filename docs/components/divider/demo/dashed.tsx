import React from 'react'

import { Divider } from 'react-native-system-ui'
import { DemoCard } from '../../common/DemoCard'

export default () => (
  <DemoCard>
    <Divider dashed>虚线 Divider</Divider>
    <Divider dashed lineColor="#ffb300">
      自定义颜色
    </Divider>
  </DemoCard>
)
