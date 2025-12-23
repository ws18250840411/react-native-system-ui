import React, { useState } from 'react'
import { Cell, DropdownMenu, Switch } from 'react-native-system-ui'
import { option1 } from './options'

export default () => {
  const [value, setValue] = useState<Record<string, string | number>>({})

  return (
    <DropdownMenu value={value} onChange={v => setValue(v)}>
      <DropdownMenu.Item name="value1" options={option1} />
      <DropdownMenu.Item name="value2" title="筛选">
        <Cell center title="包邮" rightIcon={<Switch size={24} />} />
        <Cell center title="团购" rightIcon={<Switch size={24} />} />
      </DropdownMenu.Item>
    </DropdownMenu>
  )
}

