import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Tabs } from 'react-native-system-ui'

const sections = [
  {
    key: 'a',
    title: '标签名1',
  },
  {
    key: 'b',
    title: '标签名2',
  },
  {
    key: 'c',
    title: '标签名3',
  },
]

const DemoBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.block}>{children}</View>
)

const Pane: React.FC<{ title: string; desc: string }> = ({ title, desc }) => (
  <View style={styles.pane}>
    <Text style={styles.paneTitle}>{title}</Text>
    <Text style={styles.paneDesc}>{desc}</Text>
  </View>
)

export default function TabsSwipeableDemo() {
  return (
    <View style={styles.root}>
      <DemoBlock>
        <Tabs
          swipeable={{ autoHeight: true }}
          lazyRender
          lazyRenderPlaceholder={<Pane title="加载中" desc="内容" />}
          color="#3a7afe"
          titleActiveColor="#3a7afe"
        >
          {sections.map(section => (
            <Tabs.TabPane key={section.key} name={section.key} title={section.title}>
              <Pane title={section.title} desc="内容" />
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
  paneTitle: {
    marginBottom: 6,
    fontSize: 16,
    fontWeight: '600',
    color: '#323233',
  },
  paneDesc: {
    fontSize: 14,
    color: '#323233',
    lineHeight: 22,
  },
})
