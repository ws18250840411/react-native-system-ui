import React from 'react'
import { View } from 'react-native'

import { Tabbar } from 'react-native-system-ui'
import { FriendsO, HomeO, Search, SettingO } from 'react-native-system-icon'

export default function TabbarBadgeDemo() {
  return (
    <View>
      <Tabbar fixed={false}>
        <Tabbar.Item icon={<HomeO />}>标签</Tabbar.Item>
        <Tabbar.Item badge={{ dot: true }} icon={<Search />}>
          标签
        </Tabbar.Item>
        <Tabbar.Item badge={{ content: 5 }} icon={<FriendsO />}>
          标签
        </Tabbar.Item>
        <Tabbar.Item badge={{ content: 20 }} icon={<SettingO />}>
          标签
        </Tabbar.Item>
      </Tabbar>
    </View>
  )
}
