import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Tabs } from 'react-native-system-ui'

const panes = [
  { name: 'a', label: '标签名1', content: '内容 1' },
  { name: 'b', label: '标签名2', content: '内容 2' },
  { name: 'c', label: '标签名3', content: '内容 3' },
]

const DemoBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.block}>{children}</View>
)

const Pane: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.pane}>
    {typeof children === 'string' || typeof children === 'number' ? (
      <Text style={styles.paneText}>{children}</Text>
    ) : (
      children
    )}
  </View>
)

export default function TabsNameMatchDemo() {
  return (
    <View style={styles.root}>
      <DemoBlock>
        <Tabs
          defaultActive="c"
          color="#3a7afe"
          titleActiveColor="#3a7afe"
          tabStyle={{ flexGrow: 1, flexShrink: 1, flexBasis: 0 }}
        >
          {panes.map(item => (
            <Tabs.TabPane key={item.name} name={item.name} title={item.label}>
              <Pane>{item.content}</Pane>
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
