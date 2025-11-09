import React from 'react'

import { Cell } from 'react-native-system-ui'

export default () => (
  <Cell.Group>
    <Cell title="标题" value="内容" />
    <Cell title="可点击" isLink value="跳转" />
  </Cell.Group>
)
