import React, { useState } from 'react'
import { DropdownMenu, Toast } from 'react-native-system-ui'
import { option1 } from './options'

export default () => {
  const [value, setValue] = useState<Record<string, string | number>>({})

  return (
    <DropdownMenu
      value={value}
      onChange={v => {
        setValue(v)
        Toast.info(`当前值：${JSON.stringify(v)}`)
      }}
    >
      <DropdownMenu.Item name="value1" options={option1} />
    </DropdownMenu>
  )
}
