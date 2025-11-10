import React from 'react'

import { Typography } from 'react-native-system-ui'
import { DemoCard } from '../../common/DemoCard'

export default () => (
  <DemoCard>
    {[1, 2, 3, 4, 5, 6].map(level => (
      <Typography.Title key={level} level={level as any}>
        {level} 级标题
      </Typography.Title>
    ))}
  </DemoCard>
)
