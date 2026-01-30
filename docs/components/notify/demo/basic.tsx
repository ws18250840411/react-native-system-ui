import React from 'react'

import { Cell, Notify } from 'react-native-system-ui'

export default function NotifyBasicDemo() {
  return (
    <Cell.Group>
      <Cell title="显示通知" isLink onPress={() => Notify.show('提示内容')} />
      <Cell
        title="底部通知"
        isLink
        onPress={() => Notify.show({ message: '底部提示', position: 'bottom' })}
      />
      <Cell
        title="底部通知（偏移）"
        isLink
        onPress={() =>
          Notify.show({
            message: '底部偏移',
            position: 'bottom',
            offset: 12,
          })
        }
      />
    </Cell.Group>
  )
}

