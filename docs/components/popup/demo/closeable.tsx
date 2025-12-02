import React from 'react'

import { Button, Popup, Space, Icon, Cell } from 'react-native-system-ui'

export default () => {
  const [visible, setVisible] = React.useState<'default' | 'custom' | 'left' | null>(null)

  const renderPopup = (type: typeof visible, extraProps?: React.ComponentProps<typeof Popup>) => (
    <Popup
      key={type}
      visible={visible === type}
      closeable
      onClose={() => setVisible(null)}
      placement="center"
      round
      {...extraProps}
    >
      <Space direction="vertical" gap={12}>
        <Button onPress={() => setVisible(null)}>关闭</Button>
      </Space>
    </Popup>
  )

  return (
    <>
      <Cell.Group title="关闭图标">
        <Cell title="关闭图标" isLink onPress={() => setVisible('default')} />
        <Cell title="自定义图标" isLink onPress={() => setVisible('custom')} />
        <Cell title="图标位置" isLink onPress={() => setVisible('left')} />
      </Cell.Group>
      {renderPopup('default')}
      {renderPopup('custom', {
        closeIcon: <Icon name="info" size={18} color="#111" />,
      })}
      {renderPopup('left', { closeIconPosition: 'top-left' })}
    </>
  )
}
