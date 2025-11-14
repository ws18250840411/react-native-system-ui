import React from 'react'

import { Button, Toast, Space } from 'react-native-system-ui'

export default () => {
  const showLoading = () => {
    const toast = Toast.loading({ message: '加载中...', forbidClick: true })

    setTimeout(() => {
      toast.update({ type: 'success', message: '加载完成', duration: 1500 })
    }, 1500)
  }

  return (
    <Space gap={12}>
      <Button onPress={showLoading}>加载提示</Button>
    </Space>
  )
}
