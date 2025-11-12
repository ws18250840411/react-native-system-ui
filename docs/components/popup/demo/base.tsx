import React from 'react'

import { Button, Popup, Space } from 'react-native-system-ui'

export default () => {
  const [visible, setVisible] = React.useState(false)

  return (
    <Space direction="vertical" gap={12}>
      <Button type="primary" onPress={() => setVisible(true)}>
        打开弹出层
      </Button>
      <Popup visible={visible} onClose={() => setVisible(false)} placement="bottom" round>
        <Space direction="vertical" gap={8}>
          <Button onPress={() => setVisible(false)}>关闭</Button>
          <Button type="primary">确认</Button>
        </Space>
      </Popup>
    </Space>
  )
}
