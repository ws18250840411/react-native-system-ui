import React from 'react'
import { Selector } from 'react-native-system-ui'

import { options } from './options'

export default function SelectorBasicDemo() {
  return <Selector options={options} defaultValue={['1']} />
}
