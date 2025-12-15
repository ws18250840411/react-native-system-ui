import React from 'react'

import { Space } from 'react-native-system-ui'
import { LikeO, LocationO, StarO } from 'react-native-system-icon'

export default () => (
  <Space gap={20}>
    <LocationO />
    <LikeO />
    <StarO />
  </Space>
)
