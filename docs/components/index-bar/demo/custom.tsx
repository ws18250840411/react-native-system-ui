import React from 'react'
import { View } from 'react-native'

import { Cell, IndexBar } from 'react-native-system-ui'

const customIndexList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export default () => (
  <View style={{ height: 400 }}>
    <IndexBar indexList={customIndexList}>
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
