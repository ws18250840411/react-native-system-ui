import React from 'react'

import { Button, Toast, Space } from 'react-native-system-ui'

export default () => (
  <Space gap={12}>
    <Button
      onPress={() =>
        Toast.show({ message: '请求处理中...', forbidClick: true, duration: 1500 })
      }
    >
      禁止点击
    </Button>
    <Button
      onPress={() =>
        Toast.show({ message: '带遮罩', overlay: true, duration: 1500 })
      }
    >
      开启遮罩
    </Button>
  </Space>
)
