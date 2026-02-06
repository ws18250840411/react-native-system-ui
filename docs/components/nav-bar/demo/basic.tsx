import React from 'react'
import { Alert, View } from 'react-native'

import { NavBar } from 'react-native-system-ui'

const Block = () => (
  <View style={{ height: 120, backgroundColor: '#f4f5f7', margin: 16, borderRadius: 12 }} />
)

export default function NavBarBasicDemo() {
  return (
  <>
    <NavBar
      title="标题"
      leftText="返回"
      leftArrow
      rightText="按钮"
      onClickLeft={() => Alert.alert('点击返回')}
      onClickRight={() => Alert.alert('点击按钮')}
    />
    <Block />
    <Block />
  </>
  )
}
