import React from 'react'

import { Cell, Popup } from 'react-native-system-ui'

export default () => {
  const [placement, setPlacement] = React.useState<'top' | 'bottom'>('bottom')
  const [visible, setVisible] = React.useState(false)

  const open = (pos: 'top' | 'bottom') => {
    setPlacement(pos)
    setVisible(true)
  }

  return (
    <>
      <Cell.Group title="圆角">
        <Cell title="顶部圆角" isLink onPress={() => open('top')} />
        <Cell title="底部圆角" isLink onPress={() => open('bottom')} />
      </Cell.Group>
      <Popup
        visible={visible}
        placement={placement}
        round
        onClose={() => setVisible(false)}
      >
        <Cell title={`当前：${placement}`} />
      </Popup>
    </>
  )
}
