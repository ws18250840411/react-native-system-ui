import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Tabs } from 'react-native-system-ui'

const Section = ({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionCard}>{children}</View>
    {desc ? <Text style={styles.sectionDesc}>{desc}</Text> : null}
  </View>
)

const contentStyle = {
  paddingVertical: 16,
  paddingHorizontal: 20,
}

export default function TabsBasicDemo() {
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Tabs 标签页</Text>
      <Section title="基础用法" desc="通知与系统消息将显示在这里。">
        <Tabs
          defaultActive="message"
          color="#2563eb"
          titleActiveColor="#2563eb"
          navRight={<Text style={styles.navLink}>全部</Text>}
        >
          <Tabs.TabPane title="消息" name="message">
            <View style={contentStyle}>
              <Text>展示与系统有关的通知。</Text>
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
      </Section>

      <Section title="卡片风格" desc="卡片风格适合少量标签场景。">
        <Tabs type="card" align="start" titleInactiveColor="#1f2937">
          <Tabs.TabPane title="概览" name="overview">
            <View style={contentStyle}>
              <Text>数据概览面板。</Text>
            </View>
          </Tabs.TabPane>
          <Tabs.TabPane title="活动" name="events">
            <View style={contentStyle}>
              <Text>营销活动管理。</Text>
            </View>
          </Tabs.TabPane>
          <Tabs.TabPane title="报表" name="report">
            <View style={contentStyle}>
              <Text>财务/运营报表输出。</Text>
            </View>
          </Tabs.TabPane>
          <Tabs.TabPane title="设置" name="settings" description="权限">
            <View style={contentStyle}>
              <Text>工作区权限设置。</Text>
            </View>
          </Tabs.TabPane>
        </Tabs>
      </Section>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f6f8',
    borderRadius: 24,
    padding: 16,
    gap: 12,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  sectionCard: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(15,23,42,0.08)',
    overflow: 'hidden',
  },
  sectionDesc: {
    color: '#6b7280',
  },
  navLink: {
    color: '#2563eb',
    fontWeight: '500',
  },
})
