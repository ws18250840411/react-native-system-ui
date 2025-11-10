import React from 'react'

import { Divider } from 'react-native-system-ui'
import { DemoCard } from '../../common/DemoCard'

export default () => (
  <DemoCard>
    <Divider
      lineColor="#3f45ff"
      textStyle={{ color: '#3f45ff' }}
      style={{ marginVertical: 24 }}
    >
      自定义主题
    </Divider>
  </DemoCard>
)
