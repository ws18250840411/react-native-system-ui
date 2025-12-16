import React from 'react'

import { Button, Cell, Popup, Space } from 'react-native-system-ui'
import { StyleSheet, View } from 'react-native'

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
      <Cell title="异步关闭" isLink onPress={() => setVisible(true)} />
      <Popup
        visible={visible}
        placement="center"
        closeable
        beforeClose={beforeClose}
        onClose={() => setVisible(false)}
        round
      >
        <View style={styles.dialog}>
          <Space direction="vertical" gap={16} align="center">
            <Button type="primary" size="large" onPress={() => setVisible(false)} style={styles.button} text="关闭" />
            {loading ? (
              <Button size="small" disabled text="加载中..." />
            ) : null}
          </Space>
        </View>
      </Popup>
    </>
  )
}

const styles = StyleSheet.create({
  dialog: {
    minWidth: 260,
    paddingHorizontal: 32,
    paddingVertical: 28,
    alignItems: 'center',
  },
  button: {
    minWidth: 200,
  },
})
