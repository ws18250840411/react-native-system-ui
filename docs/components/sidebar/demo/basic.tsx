import React from 'react'
import { Sidebar } from 'react-native-system-ui'

export default function SidebarBasicDemo() {
  return (
  <Sidebar defaultValue={0} style={{ height: 200 }}>
    <Sidebar.Item title="标签名1" />
    <Sidebar.Item title="标签名2" />
    <Sidebar.Item title="标签名3" />
  </Sidebar>
  )
}
