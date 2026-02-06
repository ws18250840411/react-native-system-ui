import React from 'react'
import { Cell, Dialog } from 'react-native-system-ui'

export default function DialogPromiseDemo() {
  return (
    <Cell.Group>
      <Cell
        title="Dialog.alert"
        isLink
        onPress={async () => {
          await Dialog.alert({
            title: '标题',
            message: '代码是写出来给人看的，附带能在机器上运行',
          })
          console.log('confirm')
        }}
      />
      <Cell
        title="Dialog.confirm"
        isLink
        onPress={async () => {
          try {
            await Dialog.confirm({
              title: '标题',
              message: '代码是写出来给人看的，附带能在机器上运行',
            })
            console.log('confirm')
          } catch (error) {
            console.log('cancel')
          }
        }}
      />
    </Cell.Group>
  )
}

