import React from 'react'
import { View } from 'react-native'

import { Tabbar } from 'react-native-system-ui'
import { FriendsO, HomeO, Search, SettingO } from 'react-native-system-icon'

export default function TabbarBaseDemo() {
  return (
    <View>
      <Tabbar fixed={false}>
        <Tabbar.Item icon={<HomeO />}>标签</Tabbar.Item>
        <Tabbar.Item icon={<Search />}>标签</Tabbar.Item>
        <Tabbar.Item icon={<FriendsO />}>标签</Tabbar.Item>
        <Tabbar.Item icon={<SettingO />}>标签</Tabbar.Item>
      </Tabbar>
    </View>
  )
}
