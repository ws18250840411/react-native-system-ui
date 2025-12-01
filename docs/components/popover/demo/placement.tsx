import React from 'react'
import { Text, View } from 'react-native'

import { Popover, Button } from 'react-native-system-ui'

export default () => (
  <View style={{ flexDirection: 'row', gap: 12 }}>
    <Popover trigger={<Button text="上方" />} placement="top">
      <Text>顶部弹出</Text>
    </Popover>
    <Popover trigger={<Button text="下方" />} placement="bottom">
      <Text>底部弹出</Text>
    </Popover>
  </View>
)
