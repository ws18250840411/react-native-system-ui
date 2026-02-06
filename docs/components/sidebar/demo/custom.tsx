import React from 'react'

import { Sidebar } from 'react-native-system-ui'

export default function SidebarCustomDemo() {
  return (
  <Sidebar defaultValue={1} style={{ height: 240 }}>
    <Sidebar.Item title="标签名" dot />
    <Sidebar.Item title="标签名" badge={5} />
    <Sidebar.Item title="标签名" disabled />
  </Sidebar>
  )
}
