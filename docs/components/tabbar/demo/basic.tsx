import React from 'react'
import { Text } from 'react-native'

import { Tabbar } from 'react-native-system-ui'

const icon = (label: string, active: boolean) => (
  <Text style={{ fontSize: 20 }}>{active ? `● ${label}` : `○ ${label}`}</Text>
)

export default () => (
  <Tabbar defaultValue="tab1">
    <Tabbar.Item name="tab1" icon={active => icon('1', active)}>
      标签名1
    </Tabbar.Item>
    <Tabbar.Item name="tab2" icon={active => icon('2', active)}>
      标签名2
    </Tabbar.Item>
    <Tabbar.Item name="tab3" icon={active => icon('3', active)}>
      标签名3
    </Tabbar.Item>
  </Tabbar>
)
