import React from 'react'

import { Button, Popup, Space } from 'react-native-system-ui'

export default () => {
  const [placement, setPlacement] = React.useState<'top' | 'bottom' | 'left' | 'right' | 'center'>('center')
  const [visible, setVisible] = React.useState(false)

  const trigger = (pos: typeof placement) => {
    setPlacement(pos)
    setVisible(true)
  }

  return (
    <Space direction="vertical" gap={8}>
      <Space gap={8} wrap>
        {(['top', 'bottom', 'left', 'right', 'center'] as const).map(item => (
          <Button key={item} size="small" onPress={() => trigger(item)}>
            {item}
          </Button>
        ))}
      </Space>
      <Popup
        visible={visible}
        placement={placement}
        closeOnOverlayPress
        onClose={() => setVisible(false)}
        round
      >
        <Button type="primary" onPress={() => setVisible(false)}>
          当前：{placement}
        </Button>
      </Popup>
    </Space>
  )
}
