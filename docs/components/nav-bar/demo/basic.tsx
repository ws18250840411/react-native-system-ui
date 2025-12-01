import React from 'react'
import { Alert, View } from 'react-native'

import { NavBar } from 'react-native-system-ui'

const Block = () => (
  <View style={{ height: 120, backgroundColor: '#f4f5f7', margin: 16, borderRadius: 12 }} />
)

export default () => (
  <>
    <NavBar
      title="标题"
      leftText="返回"
      rightText="完成"
      onPressLeft={() => Alert.alert('返回')}
      onPressRight={() => Alert.alert('完成')}
    />
    <Block />
    <Block />
  </>
)
