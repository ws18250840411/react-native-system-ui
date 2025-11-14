import React from 'react'

import { Button, Toast, Space } from 'react-native-system-ui'

export default () => {
  const setPrimary = () => {
    Toast.setDefaultOptions({ duration: 3000, position: 'top' })
    Toast.success('之后的提示默认 3 秒并显示在顶部')
  }

  const reset = () => {
    Toast.resetDefaultOptions()
    Toast.show('配置已还原')
  }

  return (
    <Space gap={12}>
      <Button onPress={setPrimary}>设置默认</Button>
      <Button onPress={reset}>重置默认</Button>
    </Space>
  )
}
