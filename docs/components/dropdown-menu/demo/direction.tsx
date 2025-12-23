import React, { useState } from 'react'
import { View } from 'react-native'

import { DropdownMenu } from 'react-native-system-ui'
import { option1, option2 } from './options'

export default () => {
  const [value, setValue] = useState<Record<string, string | number>>({})

  return (
    <View style={{ justifyContent: 'flex-end' }}>
      <DropdownMenu direction="up" value={value} onChange={v => setValue(v)}>
        <DropdownMenu.Item name="value1" options={option1} />
        <DropdownMenu.Item name="value2" options={option2} />
      </DropdownMenu>
    </View>
  )
}

