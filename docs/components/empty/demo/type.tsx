import React from 'react'

import { Empty, Tabs } from 'react-native-system-ui'

export default function EmptyTypeDemo() {
  return (
  <Tabs defaultActive="error">
    <Tabs.TabPane name="error" title="错误">
      <Empty image="error" description="描述信息" />
    </Tabs.TabPane>
    <Tabs.TabPane name="network" title="网络">
      <Empty image="network" description="描述信息" />
    </Tabs.TabPane>
    <Tabs.TabPane name="search" title="搜索">
      <Empty image="search" description="描述信息" />
    </Tabs.TabPane>
  </Tabs>
  )
}
