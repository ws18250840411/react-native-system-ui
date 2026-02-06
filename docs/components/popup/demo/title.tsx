import React from 'react'

import { Cell, Popup } from 'react-native-system-ui'

export default function PopupTitleDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <Cell.Group>
      <Cell title="标题弹框" isLink onPress={() => setVisible(true)} />
      <Popup
        visible={visible}
        closeable
        title="标题"
        description="这是一段很长很长的描述这是一段很长很长的描述这是一段很长很长的描述这是一段很长很长的描述"
        style={{ height: '30%' }}
        placement="bottom"
        round
        onClose={() => setVisible(false)}
      />
    </Cell.Group>
  )
}

