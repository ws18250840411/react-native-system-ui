import React from 'react'

import { Cell, Toast } from 'react-native-system-ui'

export default function ToastLoadingDemo() {
  const showLoading = () => {
    const toast = Toast.loading({ message: '加载中...', forbidClick: true })

    setTimeout(() => {
      toast.update({ type: 'success', message: '加载完成', duration: 1500 })
    }, 1500)
  }

  return (
    <Cell.Group title="动态更新" card>
      <Cell title="加载并更新状态" isLink onPress={showLoading} />
    </Cell.Group>
  )
}
