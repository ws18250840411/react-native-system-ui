import React from 'react'

import { Cell } from 'react-native-system-ui'
import { FriendsO } from '@react-vant/icons'

export default () => (
  <Cell.Group>
    <Cell title="联系人" label="张三" icon={<FriendsO />} value="138****8888" isLink />
    <Cell title="联系人" label="李四" icon={<FriendsO />} value="139****0000" isLink />
  </Cell.Group>
)
