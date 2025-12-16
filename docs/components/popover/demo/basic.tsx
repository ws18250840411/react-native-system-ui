import React from 'react'
import { Text } from 'react-native'
import { Popover, Button } from 'react-native-system-ui'

export default () => (
  <Popover
    trigger={<Button text="展示气泡" />}
  >
    <Text>内容</Text>
  </Popover>
)
