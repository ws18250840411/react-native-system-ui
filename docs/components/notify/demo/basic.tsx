import React from 'react'

import { Cell, Notify } from 'react-native-system-ui'

export default function NotifyBasicDemo() {
  return (
    <Cell.Group>
      <Cell
        title="显示通知（开启安全区裁切）"
        isLink
        onPress={() => Notify.show({ message: '提示内容', safeAreaInsetTop: true })}
      />
      <Cell
        title="显示通知（关闭安全区域）"
        isLink
        onPress={() => Notify.show({ message: '提示内容', safeAreaInsetTop: false })}
      />
    </Cell.Group>
  )
}

