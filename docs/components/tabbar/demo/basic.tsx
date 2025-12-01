import React from 'react'
import { Text } from 'react-native'

import { Tabbar } from 'react-native-system-ui'

const icon = (label: string, active: boolean) => (
  <Text style={{ fontSize: 20 }}>{active ? `● ${label}` : `○ ${label}`}</Text>
)

export default () => (
  <Tabbar defaultValue="home">
    <Tabbar.Item name="home" icon={active => icon('H', active)}>
      首页
    </Tabbar.Item>
    <Tabbar.Item name="message" icon={active => icon('M', active)}>
      消息
    </Tabbar.Item>
    <Tabbar.Item name="me" icon={active => icon('U', active)}>
      我的
    </Tabbar.Item>
  </Tabbar>
)
