import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Tabs } from 'react-native-system-ui'

const sections = [
  { key: 'overview', title: '概览', desc: '聚合近 24 小时的核心数据' },
  { key: 'trend', title: '趋势', desc: '多维度分析渠道表现' },
  { key: 'revenue', title: '营收', desc: '拆解业务线营收结构' },
  { key: 'ops', title: '运营', desc: '排期、投放、增长等运营指标' },
  { key: 'system', title: '系统', desc: '系统事件与巡检记录' },
]

const Panel: React.FC<{ title: string; desc: string }> = ({ title, desc, children }) => (
  <View style={styles.panel}>
    <Text style={styles.panelTitle}>{title}</Text>
    <Text style={styles.panelDesc}>{desc}</Text>
    <View style={styles.panelBody}>{children}</View>
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
            <Panel title={section.title} desc={section.desc}>
              <Text style={styles.panelCopy}>
                {section.title} 面板提供响应式的卡片组件，适配 React Vant 的展示密度。可结合 Portal/Popup 弹出补充信息。
              </Text>
            </Panel>
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
