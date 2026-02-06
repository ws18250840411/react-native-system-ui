import React from 'react'

import { Popup, Cell } from 'react-native-system-ui'
import { Fire } from 'react-native-system-icon'

export default function PopupCloseableDemo() {
  const [showCloseIcon, setShowCloseIcon] = React.useState(false)
  const [showCustomCloseIcon, setShowCustomCloseIcon] = React.useState(false)
  const [showCustomIconPosition, setShowCustomIconPosition] = React.useState(false)

  return (
    <Cell.Group>
      <Cell title="关闭图标" isLink onPress={() => setShowCloseIcon(true)} />
      <Cell title="自定义关闭图标" isLink onPress={() => setShowCustomCloseIcon(true)} />
      <Cell title="图标位置" isLink onPress={() => setShowCustomIconPosition(true)} />

      <Popup
        visible={showCloseIcon}
        closeable
        style={{ height: '30%' }}
        placement="bottom"
        onClose={() => setShowCloseIcon(false)}
      />
      <Popup
        visible={showCustomCloseIcon}
        closeable
        style={{ height: '30%' }}
        placement="bottom"
        closeIcon={<Fire />}
        onClose={() => setShowCustomCloseIcon(false)}
      />
      <Popup
        visible={showCustomIconPosition}
        closeable
        style={{ height: '30%' }}
        placement="bottom"
        closeIconPosition="top-left"
        onClose={() => setShowCustomIconPosition(false)}
      />
    </Cell.Group>
  )
}
