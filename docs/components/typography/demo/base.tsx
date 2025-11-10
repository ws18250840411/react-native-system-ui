import React from 'react'

import { Typography } from 'react-native-system-ui'
import { DemoCard } from '../../common/DemoCard'

export default () => (
  <DemoCard>
    <Typography.Text>
      在移动端也可以复用 <Typography.Text strong type="primary">react-vant</Typography.Text> 的排版体验。
    </Typography.Text>
  </DemoCard>
)
