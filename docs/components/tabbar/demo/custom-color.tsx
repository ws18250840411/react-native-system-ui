import React from 'react'
import { View } from 'react-native'

import { Tabbar } from 'react-native-system-ui'
import { FriendsO, HomeO, Search, SettingO } from 'react-native-system-icon'

export default function TabbarCustomColorDemo() {
  return (
    <View>
      <Tabbar fixed={false} activeColor="#f44336" inactiveColor="#000">
        <Tabbar.Item icon={<HomeO />}>颜色</Tabbar.Item>
        <Tabbar.Item icon={<Search />}>颜色</Tabbar.Item>
        <Tabbar.Item icon={<FriendsO />}>颜色</Tabbar.Item>
        <Tabbar.Item icon={<SettingO />}>颜色</Tabbar.Item>
      </Tabbar>
    </View>
  )
}
