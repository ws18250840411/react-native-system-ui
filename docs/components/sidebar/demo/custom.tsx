import React from 'react'
import { Text, View } from 'react-native'

import { Badge, Sidebar } from 'react-native-system-ui'

export default () => (
  <Sidebar defaultValue={1} style={{ height: 240 }}>
    <Sidebar.Item title="关注" badge={<Badge dot color="#ff4d4f" />}>有新动态</Sidebar.Item>
    <Sidebar.Item title="收藏" badge={<Badge content={12} />}>历史收藏与标签</Sidebar.Item>
    <Sidebar.Item title="草稿" disabled>暂不可用</Sidebar.Item>
  </Sidebar>
)
