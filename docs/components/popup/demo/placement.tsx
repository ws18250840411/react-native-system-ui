import React from 'react'

import { Platform } from 'react-native'

import { Cell, Popup, Portal, type PopupPlacement } from 'react-native-system-ui'

const Host: React.FC<{ children: React.ReactNode }> = ({ children }) =>
  Platform.OS === 'web' ? <Portal.Host fixed>{children}</Portal.Host> : <>{children}</>

export default () => {
  const [state, setState] = React.useState<PopupPlacement | ''>('')

  const close = () => setState('')

  return (
    <Host>
      <Cell.Group>
        <Cell title="顶部弹出" isLink onPress={() => setState('top')} />
        <Cell title="底部弹出" isLink onPress={() => setState('bottom')} />
        <Cell title="左侧弹出" isLink onPress={() => setState('left')} />
        <Cell title="右侧弹出" isLink onPress={() => setState('right')} />

        <Popup visible={state === 'top'} style={{ height: '30%' }} placement="top" onClose={close} />
        <Popup visible={state === 'bottom'} style={{ height: '30%' }} placement="bottom" onClose={close} />
        <Popup visible={state === 'left'} style={{ width: '30%', height: '100%' }} placement="left" onClose={close} />
        <Popup visible={state === 'right'} style={{ width: '30%', height: '100%' }} placement="right" onClose={close} />
      </Cell.Group>
    </Host>
  )
}
