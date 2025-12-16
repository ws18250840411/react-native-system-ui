import React from 'react'
import { Text, View } from 'react-native'

import { Popover, Button } from 'react-native-system-ui'

export default () => (
  <View style={{ flexDirection: 'row', gap: 12 }}>
    <Popover trigger={<Button text="顶部" />} placement="top">
      <Text>内容</Text>
    </Popover>
    <Popover trigger={<Button text="底部" />} placement="bottom">
      <Text>内容</Text>
    </Popover>
  </View>
)
