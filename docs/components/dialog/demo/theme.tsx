import React from 'react'
import { View } from 'react-native'

import { Button, Dialog } from 'react-native-system-ui'

export default () => {
  const [visible, setVisible] = React.useState(false)

  return (
    <View>
      <Button text="圆角按钮" onPress={() => setVisible(true)} />
      <Dialog
        visible={visible}
        theme="round-button"
        title="升级提示"
        message="升级将重启应用，过程大约 5 分钟。"
        showCancelButton
        confirmButtonText="立即升级"
        cancelButtonText="稍后"
        onCancel={() => setVisible(false)}
        onConfirm={() => setVisible(false)}
        onClose={() => setVisible(false)}
      />
    </View>
  )
}
