import React from 'react'
import { Text, View } from 'react-native'

import { IndexBar } from 'react-native-system-ui'

const sections = Array.from({ length: 5 }).map((_, idx) => String.fromCharCode(65 + idx))

export default () => (
  <View style={{ height: 360 }}>
    <IndexBar highlightColor="#ff5722" indicatorStyle={{ backgroundColor: '#ff5722' }}>
      {sections.map(section => (
        <IndexBar.Anchor key={section} index={section} title={`索引 ${section}`}>
          <Text style={{ padding: 16 }}>内容 {section}</Text>
        </IndexBar.Anchor>
      ))}
    </IndexBar>
  </View>
)
