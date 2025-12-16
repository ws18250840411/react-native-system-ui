import React from 'react'
import { Selector } from 'react-native-system-ui'

import { options } from './options'

export default function SelectorCustomStyleDemo() {
  return (
    <Selector
      options={options}
      defaultValue={['1']}
      showCheckMark={false}
      itemStyle={{ borderRadius: 999, paddingVertical: 6, paddingHorizontal: 15 }}
    />
  )
}

