import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Tabs } from 'react-native-system-ui'

const tabs = Array.from({ length: 8 }).map((_, idx) => ({
  key: `tab-${idx + 1}`,
  title: `标签名${idx + 1}`,
  desc: `内容 ${idx + 1}`,
}))

const DemoBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.block}>{children}</View>
)

const Pane: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.pane}>
    <Text style={styles.paneText}>{children}</Text>
  </View>
)

export default function TabsScrollableDemo() {
  return (
    <View style={styles.root}>
      <DemoBlock>
        <Tabs
          defaultActive={tabs[0].key}
          color="#3a7afe"
          titleActiveColor="#3a7afe"
          scrollable
          align="start"
        >
          {tabs.map(tab => (
            <Tabs.TabPane key={tab.key} name={tab.key} title={tab.title}>
              <Pane>{tab.desc}</Pane>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  block: {
    paddingTop: 6,
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
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
