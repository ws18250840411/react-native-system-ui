import React from 'react'
import { Text, View } from 'react-native'

import { Divider } from 'react-native-system-ui'

export default () => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Text>信息流</Text>
    <Divider type="vertical" style={{ height: 20, marginHorizontal: 12 }} />
    <Text>评论</Text>
    <Divider type="vertical" dashed style={{ height: 20, marginHorizontal: 12 }} />
    <Text>点赞</Text>
  </View>
)
