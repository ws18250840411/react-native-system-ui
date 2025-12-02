import React from 'react'

import { Button, Cell, Popup } from 'react-native-system-ui'

export default () => {
  const [visible, setVisible] = React.useState(false)

  return (
    <>
      <Cell.Group title="基础用法">
        <Cell title="展示弹出层" isLink onPress={() => setVisible(true)} />
      </Cell.Group>
      <Popup visible={visible} onClose={() => setVisible(false)} placement="bottom" round>
        <Button type="primary" onPress={() => setVisible(false)}>
          我知道了
        </Button>
      </Popup>
    </>
  )
}
