import React from 'react'
import { Selector } from 'react-native-system-ui'

import { options } from './options'

export default function SelectorMultipleDemo() {
  return <Selector options={options} multiple defaultValue={['2', '3']} />
}
