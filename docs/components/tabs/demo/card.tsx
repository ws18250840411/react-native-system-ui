import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Tabs } from 'react-native-system-ui'

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
)

const jumboTabs = [
  { title: '标签 1', desc: '描述内容' },
  { title: '标签 2', desc: '描述内容' },
  { title: '标签 3', desc: '描述内容' },
]

export default function TabsStyleDemo() {
  return (
    <View style={styles.container}>
      <Section title="胶囊标签页">
        <Tabs type="capsule" align="start" titleActiveColor="#1d4ed8">
          {['推荐', '关注', '榜单'].map((item, index) => (
            <Tabs.TabPane title={item} badge={index === 2 ? 'HOT' : undefined} name={item} key={item}>
              <View style={styles.contentBox}>
                <Text>{item} 内容区域</Text>
              </View>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </Section>

      <Section title="带描述的标签">
        <Tabs type="jumbo" align="start" ellipsis={false} titleActiveColor="#0f172a">
          {jumboTabs.map(item => (
            <Tabs.TabPane
              title={item.title}
              description={item.desc}
              name={item.title}
              key={item.title}
            >
              <View style={styles.contentBox}>
                <Text>{item.title} 区域</Text>
              </View>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </Section>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  contentBox: {
    marginTop: 12,
    borderRadius: 16,
    padding: 16,
    backgroundColor: '#f5f6f8',
  },
})
