import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Tabs } from 'react-native-system-ui'

const primaryColor = '#3a7afe'
const baseTabs = [1, 2, 3]

const makeTab = (prefix: string, index: number) => ({
  key: `${prefix}-${index}`,
  title: `标签名${index}`,
})

const DemoBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.block}>{children}</View>
)

const fullTabStyle = { flexGrow: 1, flexShrink: 1, flexBasis: 0 }

const Pane: React.FC<{ children: React.ReactNode; tone?: 'default' | 'plain' }> = ({
  children,
  tone = 'default',
}) => (
  <View style={[styles.pane, tone === 'plain' ? styles.panePlain : null]}>
    {typeof children === 'string' || typeof children === 'number' ? (
      <Text style={styles.paneText}>{children}</Text>
    ) : (
      children
    )}
  </View>
)

export default function TabsBasicDemo() {
  const lineTabs = baseTabs.map(item => ({ ...makeTab('line', item), desc: `内容 ${item}` }))
  const capsuleTabs = baseTabs.map(item => ({ ...makeTab('capsule', item), desc: `内容 ${item}` }))
  const jumboTabs = baseTabs.map(item => ({ ...makeTab('jumbo', item), desc: `内容 ${item}`, badge: item }))
  const cardTabs = baseTabs.map(item => ({ ...makeTab('card', item), desc: `内容 ${item}` }))

  return (
    <View style={styles.root}>
      <DemoBlock>
        <Tabs
          defaultActive={lineTabs[0].key}
          border={false}
          color={primaryColor}
          titleActiveColor={primaryColor}
          align="start"
          tabStyle={fullTabStyle}
        >
          {lineTabs.map(tab => (
            <Tabs.TabPane key={tab.key} name={tab.key} title={tab.title}>
              <Pane>{tab.desc}</Pane>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>

      <DemoBlock>
        <Tabs
          border
          type="capsule"
          color={primaryColor}
          defaultActive={capsuleTabs[0].key}
          align="start"
          tabStyle={fullTabStyle}
          tabBarStyle={{ paddingHorizontal: 0 }}
        >
          {capsuleTabs.map(tab => (
            <Tabs.TabPane key={tab.key} name={tab.key} title={tab.title}>
              <Pane>{tab.desc}</Pane>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>

      <DemoBlock>
        <Tabs
          border
          type="jumbo"
          color={primaryColor}
          defaultActive={jumboTabs[0].key}
          align="start"
          tabStyle={fullTabStyle}
        >
          {jumboTabs.map(tab => (
            <Tabs.TabPane
              key={tab.key}
              name={tab.key}
              title={tab.title}
              description="描述信息"
              badge={tab.badge}
            >
              <Pane>{tab.desc}</Pane>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>

      <DemoBlock>
        <Tabs
          type="card"
          color={primaryColor}
          defaultActive={cardTabs[0].key}
          align="start"
          tabStyle={fullTabStyle}
        >
          {cardTabs.map(tab => (
            <Tabs.TabPane key={tab.key} name={tab.key} title={tab.title}>
              <Pane tone="plain">{tab.desc}</Pane>
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
  panePlain: {
    backgroundColor: '#ffffff',
  },
  paneText: {
    fontSize: 14,
    color: '#323233',
    lineHeight: 22,
  },
})
