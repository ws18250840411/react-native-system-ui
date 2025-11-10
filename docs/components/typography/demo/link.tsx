import React from 'react'

import { Typography } from 'react-native-system-ui'
import { DemoCard } from '../../common/DemoCard'

export default () => (
  <DemoCard>
    <Typography.Link href="https://github.com/3lang3/react-vant">
      访问 react-vant 仓库
    </Typography.Link>
  </DemoCard>
)
