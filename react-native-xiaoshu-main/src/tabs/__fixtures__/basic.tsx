/**
 * title: 基础用法
 * description: 布局对齐 react-vant Tabs，以卡片形式展示不同风格。
 */

import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { Tabs } from '@fruits-chain/react-native-xiaoshu'

const baseTabs = [
  { key: '1', title: '标签1', desc: '下划线标签页 1' },
  { key: '2', title: '标签2', desc: '下划线标签页 2' },
  { key: '3', title: '标签3', desc: '下划线标签页 3' },
]

const capsuleTabs = [
  { key: 'c1', title: '标签1', desc: '胶囊标签页 1' },
  { key: 'c2', title: '标签2', desc: '胶囊标签页 2' },
  { key: 'c3', title: '标签3', desc: '胶囊标签页 3' },
]

const badgeTabs = [
  { key: 'b1', title: '标签1', desc: '带描述信息的标签页 1', badge: 1 },
  { key: 'b2', title: '标签2', desc: '带描述信息的标签页 2', badge: 2 },
  { key: 'b3', title: '标签3', desc: '带描述信息的标签页 3', badge: 3 },
]

const Pane: React.FC<{ title: string; desc: string }> = ({ title, desc }) => (
  <View style={styles.pane}>
    <Text style={styles.paneTitle}>{title}</Text>
    <Text style={styles.paneDesc}>{desc}</Text>
  </View>
)

const DemoCard: React.FC<{ title?: string }> = ({ title, children }) => (
  <View style={styles.card}>
    {title ? <Text style={styles.cardTitle}>{title}</Text> : null}
    {children}
  </View>
)

const BasicTabs: React.FC = () => {
  const [controlled, setControlled] = useState('1')

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.pageBody}>
      <Text style={styles.pageTitle}>Tabs 标签页</Text>
      <Text style={styles.sectionTitle}>基础用法</Text>

      <DemoCard>
        <Tabs defaultActiveKey="3">
          {baseTabs.map(tab => (
            <Tabs.TabPane key={tab.key} tab={tab.title}>
              <Pane title={tab.title} desc={tab.desc} />
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoCard>

      <DemoCard>
        <Tabs defaultActiveKey="c1" tabAlign="left" indicatorWidth={28}>
          {capsuleTabs.map(tab => (
            <Tabs.TabPane key={tab.key} tab={tab.title}>
              <Pane title={tab.title} desc={tab.desc} />
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoCard>

      <DemoCard>
        <Tabs defaultActiveKey="b1" textColor="#969799" activeTextColor="#276ef1">
          {badgeTabs.map(tab => (
            <Tabs.TabPane key={tab.key} tab={tab.title} badge={tab.badge}>
              <Pane title={tab.title} desc={tab.desc} />
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoCard>

      <Text style={styles.sectionTitle}>受控模式</Text>
      <DemoCard>
        <Tabs activeKey={controlled} onChange={setControlled} divider>
          {baseTabs.map(tab => (
            <Tabs.TabPane key={`controlled-${tab.key}`} tab={tab.title}>
              <Pane title={tab.title} desc={`${tab.desc}（受控）`} />
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoCard>

      <DemoCard title="自定义 TabBar 背景">
        <Tabs
          defaultActiveKey="1"
          tabBarHeight={48}
          tabBarBackgroundColor="#f4f6fb"
          tabBarStyle={styles.pillTabBar}
          indicatorWidth={42}
        >
          {baseTabs.map(tab => (
            <Tabs.TabPane key={`pill-${tab.key}`} tab={tab.title}>
              <Pane title={tab.title} desc="设置背景与圆角，营造卡片分组效果。" />
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoCard>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f5f6f8',
  },
  pageBody: {
    padding: 16,
    paddingBottom: 32,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2f3d',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 8,
  },
  card: {
    borderRadius: 18,
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111',
    marginBottom: 12,
  },
  pane: {
    marginTop: 16,
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 16,
    backgroundColor: '#f7f8fa',
  },
  paneTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2f3d',
  },
  paneDesc: {
    marginTop: 6,
    color: '#667085',
  },
  pillTabBar: {
    borderRadius: 12,
    marginHorizontal: 4,
  },
})

export default BasicTabs
