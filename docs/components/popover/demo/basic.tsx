import React from 'react'
import { Text } from 'react-native'
import { Popover, Button } from 'react-native-system-ui'

export default () => (
  <Popover
    trigger={<Button text="点击弹出" />}
  >
    <Text>这里是 Popover 内容</Text>
  </Popover>
)
