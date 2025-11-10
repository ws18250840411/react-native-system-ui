import React from 'react'
import { View } from 'react-native'

import { Badge, Tag } from 'react-native-system-ui'
import { DemoCard } from '../../common/DemoCard'

const Box = () => (
  <View
    style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: '#f2f3f5' }}
  />
)

export default () => (
  <DemoCard>
    <Badge content={<Tag size="mini" type="danger">NEW</Tag>}>
      <Box />
    </Badge>
  </DemoCard>
)
