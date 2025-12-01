import React from 'react'
import { Text, View } from 'react-native'

import { Tabs } from 'react-native-system-ui'

const Section = ({ title, desc }: { title: string; desc: string }) => (
  <View style={{ padding: 16 }}>
    <Text style={{ fontWeight: '600', marginBottom: 8 }}>{title}</Text>
    <Text>{desc}</Text>
  </View>
)

export default () => (
  <Tabs type="card" swipeThreshold={3} align="start">
    <Tabs.TabPane title="概览" name="overview">
      <Section title="数据概览" desc="展示业务的实时指标。" />
    </Tabs.TabPane>
    <Tabs.TabPane title="活动" name="events">
      <Section title="营销活动" desc="支持多标签切换不同营销计划。" />
    </Tabs.TabPane>
    <Tabs.TabPane title="报表" name="report">
      <Section title="财务报表" desc="拆分维度越多建议配合 ScrollView 使用。" />
    </Tabs.TabPane>
    <Tabs.TabPane title="设置" name="settings" description="权限">
      <Section title="工作区设置" desc="卡片风格适合少量标签场景。" />
    </Tabs.TabPane>
  </Tabs>
)
