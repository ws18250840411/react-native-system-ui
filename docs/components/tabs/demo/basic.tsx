import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Tabs } from 'react-native-system-ui'

const primaryColor = '#3a7afe'
const tabStyle = { flexGrow: 1, flexShrink: 1, flexBasis: 0 }

const tabs = [
  { key: '1', title: '标签 1' },
  { key: '2', title: '标签 2' },
  { key: '3', title: '标签 3' },
]

export default function TabsBasicDemo() {
  return (
    <View style={styles.root}>
      {/* 下划线风格（默认） */}
      <Tabs
        defaultActive="1"
        border={false}
        color={primaryColor}
        titleActiveColor={primaryColor}
        tabStyle={tabStyle}
      >
        {tabs.map(tab => (
          <Tabs.TabPane key={tab.key} name={tab.key} title={tab.title}>
            <View style={styles.pane}>
              <Text style={styles.paneText}>内容 {tab.key}</Text>
            </View>
          </Tabs.TabPane>
        ))}
      </Tabs>

      <View style={styles.gap} />

      {/* 胶囊风格 */}
      <Tabs
        type="capsule"
        border
        color={primaryColor}
        defaultActive="1"
        tabBarStyle={{ paddingHorizontal: 0 }}
        tabStyle={tabStyle}
      >
        {tabs.map(tab => (
          <Tabs.TabPane key={tab.key} name={tab.key} title={tab.title}>
            <View style={styles.pane}>
              <Text style={styles.paneText}>内容 {tab.key}</Text>
            </View>
          </Tabs.TabPane>
        ))}
      </Tabs>

      <View style={styles.gap} />

      {/* Jumbo 带描述 */}
      <Tabs
        type="jumbo"
        border
        color={primaryColor}
        defaultActive="1"
        tabStyle={tabStyle}
      >
        {tabs.map((tab, i) => (
          <Tabs.TabPane
            key={tab.key}
            name={tab.key}
            title={tab.title}
            description="描述信息"
            badge={i + 1}
          >
            <View style={styles.pane}>
              <Text style={styles.paneText}>内容 {tab.key}</Text>
            </View>
          </Tabs.TabPane>
        ))}
      </Tabs>

      <View style={styles.gap} />

      {/* 卡片风格 */}
      <Tabs
        type="card"
        color={primaryColor}
        defaultActive="1"
        tabStyle={tabStyle}
      >
        {tabs.map(tab => (
          <Tabs.TabPane key={tab.key} name={tab.key} title={tab.title}>
            <View style={styles.pane}>
              <Text style={styles.paneText}>内容 {tab.key}</Text>
            </View>
          </Tabs.TabPane>
        ))}
      </Tabs>
    </View>
  )
}

const styles = StyleSheet.create({
  root: { width: '100%' },
  gap: { height: 16 },
  pane: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  paneText: {
    fontSize: 14,
    color: '#323233',
    lineHeight: 22,
  },
})
