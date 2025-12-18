import React from 'react'
import { View } from 'react-native'

import { Button, Dialog, Space } from 'react-native-system-ui'

export default () => {
  const [visible, setVisible] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  return (
    <View>
      <Space>
        <Button text="异步关闭" type="primary" onPress={() => setVisible(true)} />
      </Space>
      <Dialog
        visible={visible}
        title="温馨提示"
        message="点击确认后将异步关闭"
        showCancelButton
        confirmProps={{ loading }}
        beforeClose={action => {
          if (action !== 'confirm') return true
          setLoading(true)
          return new Promise<boolean>(resolve => {
            setTimeout(() => {
              setLoading(false)
              resolve(true)
            }, 1000)
          })
        }}
        onCancel={() => setVisible(false)}
        onConfirm={() => setVisible(false)}
        onClose={() => setVisible(false)}
      />
    </View>
  )
}

