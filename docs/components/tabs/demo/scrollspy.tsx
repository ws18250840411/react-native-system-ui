import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Tabs } from 'react-native-system-ui'

const sections = [
  { key: 'a', title: '标签名1' },
  { key: 'b', title: '标签名2' },
  { key: 'c', title: '标签名3' },
  { key: 'd', title: '标签名4' },
]

const Panel: React.FC<{ title: string }> = ({ title }) => (
  <View style={styles.panel}>
    <Text style={styles.panelTitle}>{title}</Text>
    <Text style={styles.panelDesc}>描述信息</Text>
    <View style={styles.panelBody}>
      <Text style={styles.panelCopy}>内容</Text>
      <Text style={styles.panelCopy}>内容</Text>
      <Text style={styles.panelCopy}>内容</Text>
    </View>
  </View>
)

export default function TabsScrollspyDemo() {
  return (
    <View style={styles.wrapper}>
      <Tabs
        scrollspy={{ autoFocusLast: true, reachBottomThreshold: 40 }}
        color="#0f172a"
        titleActiveColor="#0f172a"
        style={styles.tabs}
        contentStyle={styles.content}
      >
        {sections.map(section => (
          <Tabs.TabPane key={section.key} name={section.key} title={section.title}>
            <Panel title={section.title} />
          </Tabs.TabPane>
        ))}
      </Tabs>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    height: 420,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(15,23,42,0.08)',
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  tabs: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    backgroundColor: '#fff',
  },
  panel: {
    borderRadius: 16,
    backgroundColor: '#f1f5f9',
    padding: 16,
    marginBottom: 16,
  },
  panelTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
  },
  panelDesc: {
    marginTop: 4,
    color: '#475569',
  },
  panelBody: {
    marginTop: 12,
  },
  panelCopy: {
    lineHeight: 20,
    color: '#1f2937',
  },
})
