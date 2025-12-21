import React from 'react'
import { View } from 'react-native'

import { Cell, IndexBar } from 'react-native-system-ui'

const indexList: string[] = []
const charCodeOfA = 'A'.charCodeAt(0)

for (let i = 0; i < 26; i += 1) {
  indexList.push(String.fromCharCode(charCodeOfA + i))
}

export default () => (
  <View style={{ height: 400 }}>
    <IndexBar>
      {indexList.map(item => (
        <IndexBar.Anchor key={item} index={item}>
          <Cell title="文本" />
          <Cell title="文本" />
          <Cell title="文本" />
        </IndexBar.Anchor>
      ))}
    </IndexBar>
  </View>
)
