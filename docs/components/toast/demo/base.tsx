import React from 'react'

import { Button, Toast, Space } from 'react-native-system-ui'

export default () => (
  <Space direction="vertical" gap={12}>
    <Button type="primary" onPress={() => Toast.success('操作成功')}>
      成功提示
    </Button>
    <Button onPress={() => Toast.info('系统处理中...')}>
      普通提示
    </Button>
  </Space>
)
