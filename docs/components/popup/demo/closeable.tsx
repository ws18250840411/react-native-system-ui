import React from 'react'

import { Button, Popup, Space, Icon } from 'react-native-system-ui'

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
      <Space gap={12}>
        <Button size="small" onPress={() => setVisible('default')}>
          默认图标
        </Button>
        <Button size="small" onPress={() => setVisible('custom')}>
          自定义图标
        </Button>
        <Button size="small" onPress={() => setVisible('left')}>
          左侧图标
        </Button>
      </Space>
      {renderPopup('default')}
      {renderPopup('custom', {
        closeIcon: <Icon name="info" size={18} color="#111" />,
      })}
      {renderPopup('left', { closeIconPosition: 'top-left' })}
    </>
  )
}
