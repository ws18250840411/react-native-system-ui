import React from 'react'
import { Platform } from 'react-native'

import { Info, Star } from 'react-native-system-icon'
import { Cell, Portal, Toast } from 'react-native-system-ui'

const Host: React.FC<{ children: React.ReactNode }> = ({ children }) =>
  Platform.OS === 'web' ? <Portal.Host fixed>{children}</Portal.Host> : <>{children}</>

export default function ToastCustomIconDemo() {
  return (
    <Host>
      <>
        <Cell
          title="使用图标组件"
          isLink
          onPress={() =>
            Toast.show({
              message: '自定义图标',
              icon: <Info size={22} fill="#2563eb" color="#2563eb" />,
            })
          }
        />
        <Cell
          title="使用图片"
          isLink
          onPress={() =>
            Toast.show({
              message: '也可以放图片',
              icon: <Star size={22} fill="#fbbf24" color="#fbbf24" />,
              duration: 1500,
            })
          }
        />
      </>
    </Host>
  )
}
