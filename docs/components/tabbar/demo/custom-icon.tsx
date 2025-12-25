import React from 'react'
import { Image, View } from 'react-native'

import { Tabbar } from 'react-native-system-ui'
import { FriendsO, SettingO } from 'react-native-system-icon'

const icon = {
  active: 'https://img.yzcdn.cn/vant/user-active.png',
  inactive: 'https://img.yzcdn.cn/vant/user-inactive.png',
}

export default () => {
  return (
    <View>
      <Tabbar fixed={false}>
        <Tabbar.Item
          icon={ac => (
            <Image
              accessibilityLabel="tab"
              source={{ uri: ac ? icon.active : icon.inactive }}
              style={{ width: 24, height: 24 }}
            />
          )}
        >
          图标
        </Tabbar.Item>
        <Tabbar.Item icon={<FriendsO />}>图标</Tabbar.Item>
        <Tabbar.Item icon={<SettingO />}>图标</Tabbar.Item>
      </Tabbar>
    </View>
  )
}


