import React from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'

import { Area, Button, Field, Tabs } from 'react-native-system-ui'

import { areaList } from './areaList'

function BasicDemo() {
  const [value, setValue] = React.useState<string[]>(['110000', '110100', '110101'])
  return <Area areaList={areaList} value={value} onChange={setValue} title="选择地区" />
}

function ColumnsDemo() {
  const [value, setValue] = React.useState<string[]>(['110000', '110100'])
  return (
    <Area areaList={areaList} columnsNum={2} value={value} onChange={setValue} title="省市选择" />
  )
}

function ControlledDemo() {
  const [value, setValue] = React.useState<string[]>(['110000', '110100', '110101'])

  const displayValue = [
    areaList.province_list[value[0]],
    areaList.city_list[value[1]],
    areaList.county_list[value[2]],
  ]
    .filter(Boolean)
    .join(' / ')

  return (
    <View style={{ gap: 12 }}>
      <Area areaList={areaList} value={value} onChange={setValue} title="受控模式" />
      <Field readOnly label="选择结果" value={displayValue} />
      <Button text="切换至上海" onPress={() => setValue(['310000', '310100', '310101'])} />
    </View>
  )
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.title}>{title}</Text>
    {children}
  </View>
)

export default function AreaTabbedDemo() {
  if (Platform.OS === 'web') {
    return (
      <View style={styles.list}>
        <Section title="基础用法">
          <BasicDemo />
        </Section>
        <Section title="列数切换">
          <ColumnsDemo />
        </Section>
        <Section title="受控模式">
          <ControlledDemo />
        </Section>
      </View>
    )
  }

  return (
    <Tabs
      defaultActive="basic"
      border={false}
      color="#3a7afe"
      titleActiveColor="#3a7afe"
      align="start"
      tabStyle={{ flexBasis: '33.33%', flexGrow: 0 }}
      tabBarStyle={{ paddingHorizontal: 0 }}
    >
      <Tabs.TabPane name="basic" title="基础用法">
        <BasicDemo />
      </Tabs.TabPane>
      <Tabs.TabPane name="columns" title="列数切换">
        <ColumnsDemo />
      </Tabs.TabPane>
      <Tabs.TabPane name="controlled" title="受控模式">
        <ControlledDemo />
      </Tabs.TabPane>
    </Tabs>
  )
}

const styles = StyleSheet.create({
  list: {
    gap: 16,
  },
  section: {
    gap: 12,
  },
  title: {
    fontSize: 14,
    color: '#323233',
    fontWeight: '600',
  },
})
