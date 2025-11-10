import React from 'react'

import { Progress } from 'react-native-system-ui'
import { DemoCard } from '../../common/DemoCard'

export default () => (
  <DemoCard>
    <Progress percentage={50} />
  </DemoCard>
)
