import React from 'react'
import { Text, View } from 'react-native'

import { Sidebar } from 'react-native-system-ui'

export default () => {
  const [active, setActive] = React.useState(0)

  return (
    <View style={{ flexDirection: 'row', height: 200 }}>
      <Sidebar value={active} onChange={setActive}>
        <Sidebar.Item title="概览" />
        <Sidebar.Item title="订单" />
        <Sidebar.Item title="客户" />
        <Sidebar.Item title="分析" />
      </Sidebar>
      <View style={{ flex: 1, padding: 16 }}>
        <Text>当前选择：{['概览', '订单', '客户', '分析'][active]}</Text>
      </View>
    </View>
  )
}
