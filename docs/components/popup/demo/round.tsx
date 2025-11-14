import React from 'react'

import { Button, Popup, Space } from 'react-native-system-ui'

export default () => {
  const [placement, setPlacement] = React.useState<'top' | 'bottom'>('bottom')
  const [visible, setVisible] = React.useState(false)

  const open = (pos: 'top' | 'bottom') => {
    setPlacement(pos)
    setVisible(true)
  }

  return (
    <Space direction="vertical" gap={8}>
      <Space gap={8}>
        <Button size="small" onPress={() => open('top')}>
          顶部圆角
        </Button>
        <Button size="small" onPress={() => open('bottom')}>
          底部圆角
        </Button>
      </Space>
      <Popup
        visible={visible}
        placement={placement}
        round
        onClose={() => setVisible(false)}
      >
        <Button type="primary" onPress={() => setVisible(false)}>
          当前：{placement}
        </Button>
      </Popup>
    </Space>
  )
}
