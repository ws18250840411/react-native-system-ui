import React from 'react'

import { Button, Toast, Space } from 'react-native-system-ui'

export default () => {
  const [visible, setVisible] = React.useState(false)

  return (
    <Space direction="vertical" gap={12}>
      <Button type="primary" onPress={() => setVisible(true)}>
        显示提示
      </Button>
      <Toast visible={visible} message="操作成功" onClose={() => setVisible(false)} />
    </Space>
  )
}
