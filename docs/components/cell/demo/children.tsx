import React from 'react'
import { Text } from 'react-native'

import { ShopO } from 'react-native-system-icon'
import { Cell } from 'react-native-system-ui'

export default () => (
  <Cell.Group>
    <Cell title="单元格" icon={<ShopO />}>
      <Text>自定义内容</Text>
    </Cell>
  </Cell.Group>
)
