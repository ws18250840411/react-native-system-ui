import React from 'react'
import { Platform } from 'react-native'

import { Cell, Portal, Toast } from 'react-native-system-ui'

const Host: React.FC<{ children: React.ReactNode }> = ({ children }) =>
  Platform.OS === 'web' ? <Portal.Host fixed>{children}</Portal.Host> : <>{children}</>

export default function ToastBasicDemo() {
  return (
    <Host>
      <Cell.Group>
        <Cell title="文字提示" isLink onPress={() => Toast.info('提示内容')} />
        <Cell
          title="加载提示"
          isLink
          onPress={() =>
            Toast.loading({
              message: '加载中...',
              forbidClick: true,
            })
          }
        />
        <Cell title="成功提示" isLink onPress={() => Toast.success('操作成功')} />
        <Cell title="失败提示" isLink onPress={() => Toast.fail('操作失败')} />
      </Cell.Group>
    </Host>
  )
}
