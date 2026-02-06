import React from 'react'

import { Divider } from 'react-native-system-ui'

export default function DividerPositionDemo() {
  return (
  <>
    <Divider contentPosition="left">文字</Divider>
    <Divider contentPosition="center">文字</Divider>
    <Divider contentPosition="right">文字</Divider>
  </>
  )
}
