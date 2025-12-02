import React from 'react'

import { Cell, Popup } from 'react-native-system-ui'

export default () => {
  const [placement, setPlacement] = React.useState<'top' | 'bottom' | 'left' | 'right' | 'center'>('center')
  const [visible, setVisible] = React.useState(false)

  const trigger = (pos: typeof placement) => {
    setPlacement(pos)
    setVisible(true)
  }

  return (
    <>
      <Cell.Group title="弹出位置">
        {(['top', 'bottom', 'left', 'right', 'center'] as const).map(item => (
          <Cell key={item} title={`${item} 弹出`} isLink onPress={() => trigger(item)} />
        ))}
      </Cell.Group>
      <Popup
        visible={visible}
        placement={placement}
        closeOnOverlayPress
        onClose={() => setVisible(false)}
        round
      >
        <Cell title={`当前：${placement}`} />
      </Popup>
    </>
  )
}
