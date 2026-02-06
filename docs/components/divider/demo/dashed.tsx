import React from 'react'

import { Divider } from 'react-native-system-ui'

export default function DividerDashedDemo() {
  return (
  <>
    <Divider dashed>文字</Divider>
    <Divider dashed lineColor="#ffb300">
      文字
    </Divider>
  </>
  )
}
