import React from 'react'
import { Cell, Dialog, Toast } from 'react-native-system-ui'

export default function DialogCloseDemo() {
  return (
    <Cell.Group>
      <Cell
        title="完全关闭后的回调"
        isLink
        onPress={() =>
          Dialog.alert({
            title: '标题',
            message: '代码是写出来给人看的，附带能在机器上运行',
            onClosed: () => console.log('onClosed'),
          })
        }
      />
      <Cell
        title="异步关闭"
        isLink
        onPress={() =>
          Dialog.show({
            title: '标题',
            message: '弹窗内容',
            showCancelButton: true,
            onCancel: () => {
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve(true)
                  Toast.success('取消按钮异步')
                }, 3000)
              })
            },
            onConfirm: () => {
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve(true)
                  Toast.success('确认按钮异步')
                }, 3000)
              })
            },
          })
        }
      />
    </Cell.Group>
  )
}

