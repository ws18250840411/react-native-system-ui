import React from 'react'
import { Text } from 'react-native'

import { Badge, Tabbar } from 'react-native-system-ui'

export default () => (
  <Tabbar activeColor="#ff5b05" inactiveColor="#999">
    <Tabbar.Item
      name="feed"
      icon={active => <Text style={{ fontSize: 18 }}>{active ? '🔥' : '☀️'}</Text>}
      badge={<Badge dot color="#ff5b05" />}
    >
      推荐
    </Tabbar.Item>
    <Tabbar.Item
      name="cart"
      icon={active => <Text style={{ fontSize: 18 }}>{active ? '🛒' : '🧺'}</Text>}
      badge={<Badge content={6} />}
    >
      购物车
    </Tabbar.Item>
    <Tabbar.Item name="mine" icon={active => <Text style={{ fontSize: 18 }}>{active ? '⭐' : '☆'}</Text>}>
      我的
    </Tabbar.Item>
  </Tabbar>
)
