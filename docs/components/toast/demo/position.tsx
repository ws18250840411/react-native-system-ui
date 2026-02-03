import React from 'react'
import { Platform } from 'react-native'

import { Cell, Portal, Toast } from 'react-native-system-ui'

const Host: React.FC<{ children: React.ReactNode }> = ({ children }) =>
  Platform.OS === 'web' ? <Portal.Host fixed>{children}</Portal.Host> : <>{children}</>

export default function ToastPositionDemo() {
  return (
    <Host>
      <Cell.Group>
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
    </Host>
  )
}
