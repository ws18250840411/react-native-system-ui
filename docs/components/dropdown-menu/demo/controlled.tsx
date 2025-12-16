import React from 'react'

import { DropdownMenu, Toast } from 'react-native-system-ui'

const options = [
  { label: '全部商品', value: 0 },
  { label: '新款商品', value: 1 },
  { label: '活动商品', value: 2 },
]

export default () => {
  const [value, setValue] = React.useState(0)
  return (
    <DropdownMenu>
      <DropdownMenu.Item
        options={options}
        value={value}
        onChange={(v, option) => {
          setValue(v)
          Toast.info(`值：${String(option?.label ?? v)}`)
        }}
      />
    </DropdownMenu>
  )
}
