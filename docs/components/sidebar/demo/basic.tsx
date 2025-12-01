import React from 'react'
import { Text, View } from 'react-native'

import { Sidebar } from 'react-native-system-ui'

const Content = ({ label }: { label: string }) => (
  <View style={{ marginLeft: 12, flex: 1, justifyContent: 'center' }}>
    <Text>{label}</Text>
  </View>
)

export default () => (
  <View style={{ flexDirection: 'row', height: 200 }}>
    <Sidebar defaultValue={0}>
      <Sidebar.Item title="热门" />
      <Sidebar.Item title="新品" />
      <Sidebar.Item title="特价" />
    </Sidebar>
    <Content label="选择左侧分类查看内容" />
  </View>
)
