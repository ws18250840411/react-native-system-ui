import React from 'react'
import { Platform } from 'react-native'

import { Cell, Portal, Toast } from 'react-native-system-ui'

const Host: React.FC<{ children: React.ReactNode }> = ({ children }) =>
  Platform.OS === 'web' ? <Portal.Host fixed>{children}</Portal.Host> : <>{children}</>

export default function ToastLoadingDemo() {
  const showLoading = () => {
    const toast = Toast.loading({ message: '加载中...', forbidClick: true })

    setTimeout(() => {
      toast.config({ type: 'success', message: '加载完成', duration: 1500 })
    }, 1500)
  }

  return (
    <Host>
      <Cell.Group>
        <Cell title="加载并更新状态" isLink onPress={showLoading} />
      </Cell.Group>
    </Host>
  )
}
