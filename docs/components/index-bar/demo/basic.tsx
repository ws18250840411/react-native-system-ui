import React from 'react'
import { Text, View } from 'react-native'

import { IndexBar } from 'react-native-system-ui'

const DATA = {
  A: ['阿里巴巴', '阿姆斯特丹'],
  B: ['北京', '柏林', '波士顿'],
  C: ['成都', '重庆', '长沙'],
}

export default () => (
  <View style={{ height: 400 }}>
    <IndexBar>
      {Object.entries(DATA).map(([index, cities]) => (
        <IndexBar.Anchor key={index} index={index} title={`字母 ${index}`}>
          {cities.map(city => (
            <Text key={city} style={{ paddingVertical: 8, paddingHorizontal: 16 }}>
              {city}
            </Text>
          ))}
        </IndexBar.Anchor>
      ))}
    </IndexBar>
  </View>
)
