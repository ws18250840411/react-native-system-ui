import React from 'react'
import { View } from 'react-native'

import { Empty } from 'react-native-system-ui'

const CustomImage = () => (
  <View
    style={{
      width: 100,
      height: 60,
      borderRadius: 12,
      backgroundColor: '#dbeafe',
    }}
  />
)

export default () => <Empty image={<CustomImage />} description="自定义插画" />
