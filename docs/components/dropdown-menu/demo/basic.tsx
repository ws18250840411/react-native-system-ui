import React from 'react'
import { DropdownMenu } from 'react-native-system-ui'

export default () => (
  <DropdownMenu>
    <DropdownMenu.Item
      options={[
        { label: '综合排序', value: 'all' },
        { label: '销量优先', value: 'sale' },
        { label: '价格优先', value: 'price' },
      ]}
      defaultValue="all"
    />
    <DropdownMenu.Item
      options={[
        { label: '包邮', value: 'shipping' },
        { label: '同城闪送', value: 'local' },
      ]}
      placeholder="配送"
    />
  </DropdownMenu>
)
