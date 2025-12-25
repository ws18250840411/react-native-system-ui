import React from 'react'
import { Alert } from 'react-native'
import { Search as SearchIcon } from 'react-native-system-icon'

import { NavBar } from 'react-native-system-ui'

export default () => (
  <NavBar
    title="标题"
    leftText="返回"
    leftArrow
    rightText={<SearchIcon size={20} />}
    onClickLeft={() => Alert.alert('点击返回')}
    onClickRight={() => Alert.alert('点击按钮')}
  />
)
