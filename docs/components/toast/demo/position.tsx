import React from 'react'

import { Button, Toast, Space } from 'react-native-system-ui'

export default () => {
  const [state, setState] = React.useState<{ visible: boolean; position: 'top' | 'middle' | 'bottom' }>({
    visible: false,
    position: 'middle',
  })

  const show = (position: 'top' | 'middle' | 'bottom') => {
    setState({ visible: true, position })
  }

  return (
    <Space direction="vertical" gap={8}>
      <Space gap={12}>
        <Button size="small" onPress={() => show('top')}>
          顶部
        </Button>
        <Button size="small" onPress={() => show('middle')}>
          中部
        </Button>
        <Button size="small" onPress={() => show('bottom')}>
          底部
        </Button>
      </Space>
      <Toast
        visible={state.visible}
        position={state.position}
        message={`出现在 ${state.position}`}
        onClose={() => setState(prev => ({ ...prev, visible: false }))}
      />
    </Space>
  )
}
