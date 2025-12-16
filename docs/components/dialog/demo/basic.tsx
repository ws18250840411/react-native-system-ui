import React from 'react'
import { View } from 'react-native'

import { Button, Dialog, Space } from 'react-native-system-ui'

export default () => {
  const [visible, setVisible] = React.useState(false)

  return (
    <View>
      <Space>
        <Button text="打开 Dialog" type="primary" onPress={() => setVisible(true)} />
      </Space>
      <Dialog
        visible={visible}
        title="温馨提示"
        message="请确认是否要继续操作"
        showCancelButton
        onCancel={() => setVisible(false)}
        onConfirm={() => setVisible(false)}
        onClose={() => setVisible(false)}
      />
    </View>
  )
}
