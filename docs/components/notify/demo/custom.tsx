import React from 'react'

import { Cell, Notify } from 'react-native-system-ui'

export default function NotifyCustomDemo() {
  return (
    <Cell.Group>
      <Cell
            title="自定义背景色"
            isLink
            onPress={() =>
              Notify.show({
                message: '自定义样式',
                color: '#ffffff',
                background: '#722ed1',
              })
            }
          />
    </Cell.Group>
  )
}

