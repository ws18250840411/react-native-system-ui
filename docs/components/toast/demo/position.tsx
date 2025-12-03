import React from 'react'

import { Cell, Toast } from 'react-native-system-ui'

export default function ToastPositionDemo() {
  return (
    <Cell.Group title="位置控制" card>
      <Cell title="顶部弹出" isLink onPress={() => Toast.show({ position: 'top', message: '顶部提示' })} />
      <Cell
        title="中部弹出"
        isLink
        onPress={() => Toast.show({ position: 'middle', message: '中部提示' })}
      />
      <Cell
        title="底部弹出"
        isLink
        onPress={() => Toast.show({ position: 'bottom', message: '底部提示' })}
      />
    </Cell.Group>
  )
}
