import React from 'react'

import { Divider } from 'react-native-system-ui'

export default () => (
  <>
    <Divider dashed>虚线 Divider</Divider>
    <Divider dashed lineColor="#ffb300">
      自定义颜色
    </Divider>
  </>
)
