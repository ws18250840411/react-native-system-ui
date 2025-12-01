import React from 'react'
import { Text, View } from 'react-native'

import { Tabs } from 'react-native-system-ui'

const contentStyle = {
  paddingVertical: 16,
  paddingHorizontal: 20,
}

export default () => (
  <Tabs defaultActive="message" onChange={name => console.log('active', name)}>
    <Tabs.TabPane title="消息" name="message">
      <View style={contentStyle}>
        <Text>通知与系统消息将显示在这里。</Text>
      </View>
    </Tabs.TabPane>
    <Tabs.TabPane title="联系人" name="contacts">
      <View style={contentStyle}>
        <Text>常用联系人、群组等信息展示。</Text>
      </View>
    </Tabs.TabPane>
    <Tabs.TabPane title="档案" name="archive">
      <View style={contentStyle}>
        <Text>跨端同步的历史记录。</Text>
      </View>
    </Tabs.TabPane>
  </Tabs>
)
