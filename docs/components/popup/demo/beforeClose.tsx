import React from 'react'

import { Button, Popup, Space } from 'react-native-system-ui'

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
      <Button onPress={() => setVisible(true)}>需要确认</Button>
      <Popup
        visible={visible}
        placement="center"
        closeable
        beforeClose={beforeClose}
        onClose={() => setVisible(false)}
        round
      >
        <Space direction="vertical" gap={8}>
          <Button type="primary" onPress={() => setVisible(false)}>
            我知道了
          </Button>
          {loading ? <Button size="small" disabled>松手即可关闭</Button> : null}
        </Space>
      </Popup>
    </>
  )
}
