import React from 'react'
import { View } from 'react-native'

import { Cell, IndexBar, Tabs } from 'react-native-system-ui'

const alphaIndexList: string[] = []
const charCodeOfA = 'A'.charCodeAt(0)

for (let i = 0; i < 26; i += 1) {
  alphaIndexList.push(String.fromCharCode(charCodeOfA + i))
}

const customIndexList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function AlphaDemo() {
  return (
    <View style={{ height: 520 }}>
      <IndexBar highlightColor="#3f45ff">
        {alphaIndexList.map(item => (
          <IndexBar.Anchor key={item} index={item}>
            <Cell title="文本" />
            <Cell title="文本" />
            <Cell title="文本" />
          </IndexBar.Anchor>
        ))}
      </IndexBar>
    </View>
  )
}

function CustomDemo() {
  return (
    <View style={{ height: 520 }}>
      <IndexBar indexList={customIndexList} highlightColor="#3f45ff">
        {customIndexList.map(item => (
          <IndexBar.Anchor key={String(item)} index={item} title={`标题 ${item}`}>
            <Cell title="文本" />
            <Cell title="文本" />
            <Cell title="文本" />
          </IndexBar.Anchor>
        ))}
      </IndexBar>
    </View>
  )
}

export default function IndexBarTabbedDemo() {
  return (
    <Tabs
      defaultActive="basic"
      border={false}
      color="#3a7afe"
      titleActiveColor="#3a7afe"
      align="start"
      tabStyle={{ flexBasis: '50%', flexGrow: 0 }}
      tabBarStyle={{ paddingHorizontal: 0 }}
    >
      <Tabs.TabPane name="basic" title="基础用法">
        <AlphaDemo />
      </Tabs.TabPane>
      <Tabs.TabPane name="custom" title="自定义索引列表">
        <CustomDemo />
      </Tabs.TabPane>
    </Tabs>
  )
}


