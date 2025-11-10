import React from 'react'

import { Divider } from 'react-native-system-ui'
import { DemoCard } from '../../common/DemoCard'

export default () => (
  <DemoCard>
    <Divider contentPosition="left">左侧内容</Divider>
    <Divider contentPosition="center">居中内容</Divider>
    <Divider contentPosition="right">右侧内容</Divider>
  </DemoCard>
)
