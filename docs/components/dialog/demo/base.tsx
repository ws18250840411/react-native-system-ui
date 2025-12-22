import React from 'react'
import { Cell, Dialog } from 'react-native-system-ui'

export default () => {
  return (
    <>
      <Cell
        title="弹窗提示"
        isLink
        onPress={() =>
          Dialog.confirm({
            title: '标题',
            message: '代码是写出来给人看的，附带能在机器上运行',
            onCancel: () => console.log('cancel'),
            onConfirm: () => console.log('confirm'),
          })
        }
      />
      <Cell
        title="弹窗提示（无标题）"
        isLink
        onPress={() =>
          Dialog.alert({
            message: '代码是写出来给人看的，附带能在机器上运行',
          })
        }
      />
      <Cell
        title="确认弹框"
        isLink
        onPress={() =>
          Dialog.confirm({
            title: '标题',
            message: '代码是写出来给人看的，附带能在机器上运行',
          })
        }
      />
    </>
  )
}

