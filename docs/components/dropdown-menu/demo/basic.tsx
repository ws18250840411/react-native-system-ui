import React from 'react'
import { DropdownMenu } from 'react-native-system-ui'

export default () => (
  <DropdownMenu>
    <DropdownMenu.Item
      options={[
        { label: '全部商品', value: 0 },
        { label: '新款商品', value: 1 },
        { label: '活动商品', value: 2 },
      ]}
      defaultValue={0}
    />
    <DropdownMenu.Item
      options={[
        { label: '默认排序', value: 'a' },
        { label: '好评排序', value: 'b' },
        { label: '销量排序', value: 'c' },
      ]}
      defaultValue="a"
    />
  </DropdownMenu>
)
