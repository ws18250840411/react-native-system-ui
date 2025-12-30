import React from 'react'
import { Cell, Dialog } from 'react-native-system-ui'

export default () => {
  return (
    <Cell.Group>
      <Cell
        title="圆角按钮弹窗"
        isLink
        onPress={() =>
          Dialog.confirm({
            title: '标题',
            theme: 'round-button',
            showCancelButton: true,
            message: '代码是写出来给人看的，附带能在机器上运行',
          })
        }
      />
      <Cell
        title="圆角按钮弹窗（无标题）"
        isLink
        onPress={() =>
          Dialog.alert({
            message: '代码是写出来给人看的，附带能在机器上运行',
            theme: 'round-button',
          })
        }
      />
    </Cell.Group>
  )
}
