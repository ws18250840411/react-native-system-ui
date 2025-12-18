import React from 'react'
import { View } from 'react-native'

import { DropdownMenu } from 'react-native-system-ui'

export default () => (
  <View style={{ height: 220, justifyContent: 'flex-end' }}>
    <DropdownMenu direction="up">
      <DropdownMenu.Item
        options={[
          { text: '全部商品', value: 0 },
          { text: '新款商品', value: 1 },
          { text: '活动商品', value: 2 },
        ]}
        defaultValue={0}
      />
      <DropdownMenu.Item
        options={[
          { text: '默认排序', value: 'a' },
          { text: '好评排序', value: 'b' },
          { text: '销量排序', value: 'c' },
        ]}
        defaultValue="a"
      />
    </DropdownMenu>
  </View>
)

