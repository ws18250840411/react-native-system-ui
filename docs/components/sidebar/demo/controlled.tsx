import React from 'react'
import { Toast, Sidebar } from 'react-native-system-ui'

export default function SidebarControlledDemo() {
  const [active, setActive] = React.useState(2)

  return (
    <Sidebar
      value={active}
      onChange={v => {
        setActive(v)
        Toast.info(`标签名 ${v + 1}`)
      }}
      style={{ height: 200 }}
    >
      <Sidebar.Item title="标签名1" />
      <Sidebar.Item title="标签名2" />
      <Sidebar.Item title="标签名3" />
    </Sidebar>
  )
}
