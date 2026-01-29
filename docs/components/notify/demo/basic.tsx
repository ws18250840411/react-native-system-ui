import React from 'react'

import { Cell, Notify } from 'react-native-system-ui'

export default function NotifyBasicDemo() {
  return (
    <Cell.Group>
      <Cell title="显示通知" isLink onPress={() => Notify.show('提示内容')} />
    </Cell.Group>
  )
}

