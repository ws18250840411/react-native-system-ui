import React from 'react'
import { Sidebar, Toast } from 'react-native-system-ui'

export default () => {
  const [active, setActive] = React.useState(0)

  return (
    <Sidebar
      value={active}
      onChange={v => {
        setActive(v)
        Toast.info(`内容区 ${v + 1}`)
      }}
      style={{ height: 240 }}
    >
      <Sidebar.Item
        title="内容1"
        contentStyle={{ backgroundColor: '#fff', paddingVertical: 18, paddingHorizontal: 10 }}
      >
        我是内容区1
      </Sidebar.Item>
      <Sidebar.Item
        title="内容2"
        contentStyle={{ backgroundColor: '#fff', paddingVertical: 18, paddingHorizontal: 10 }}
      >
        我是内容区2
      </Sidebar.Item>
      <Sidebar.Item
        title="内容3"
        contentStyle={{ backgroundColor: '#fff', paddingVertical: 18, paddingHorizontal: 10 }}
      >
        我是内容区3
      </Sidebar.Item>
    </Sidebar>
  )
}

