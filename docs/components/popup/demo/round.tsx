import React from 'react'

import { Cell, Popup } from 'react-native-system-ui'

export default () => {
  const [visible, setVisible] = React.useState(false)

  return (
    <>
      <Cell title="圆角弹窗" isLink onPress={() => setVisible(true)} />
      <Popup
        visible={visible}
        placement="bottom"
        closeable
        round
        onClose={() => setVisible(false)}
        style={{ height: '30%' }}
      />
    </>
  )
}
