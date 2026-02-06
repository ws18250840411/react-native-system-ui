import React, { useState } from 'react'
import { Cell, Dialog, Toast } from 'react-native-system-ui'
import { Image, View } from 'react-native'

export default function DialogComponentDemo() {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Cell title="组件调用" isLink onPress={() => setVisible(true)} />
      <Dialog
        visible={visible}
        title="标题"
        showCancelButton
        onConfirm={() => {
          Toast.info('点击确认按钮')
          setVisible(false)
        }}
        onCancel={() => setVisible(false)}
      >
        <View style={{ alignItems: 'center', padding: 16 }}>
          <Image
            source={{ uri: 'https://img.yzcdn.cn/vant/apple-3.jpg' }}
            style={{ width: 200, height: 200, borderRadius: 8 }}
            resizeMode="cover"
          />
        </View>
      </Dialog>
    </>
  )
}

