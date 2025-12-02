import React from 'react'

import { Button, Cell, Popup } from 'react-native-system-ui'

export default () => {
  const [visible, setVisible] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const beforeClose = async (reason: 'close-icon' | 'overlay' | 'close') => {
    if (reason === 'overlay') {
      setLoading(true)
      return new Promise<boolean>(resolve => {
        setTimeout(() => {
          setLoading(false)
          resolve(false)
        }, 800)
      })
    }
    return true
  }

  return (
    <>
      <Cell.Group title="异步关闭">
        <Cell title="需要确认" isLink onPress={() => setVisible(true)} />
      </Cell.Group>
      <Popup
        visible={visible}
        placement="center"
        closeable
        beforeClose={beforeClose}
        onClose={() => setVisible(false)}
        round
      >
        <Button type="primary" onPress={() => setVisible(false)}>
          我知道了
        </Button>
        {loading ? <Button size="small" disabled style={{ marginTop: 8 }}>松手即可关闭</Button> : null}
      </Popup>
    </>
  )
}
