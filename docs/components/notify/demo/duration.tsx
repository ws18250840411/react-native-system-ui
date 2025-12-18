import React from 'react'

import { Cell, Notify } from 'react-native-system-ui'

export default function NotifyDurationDemo() {
  return (
    <>
      <Cell
        title="持续展示（手动关闭）"
        isLink
        onPress={() => Notify.show({ message: '不会自动关闭', duration: 0 })}
      />
      <Cell
        title="动态更新"
        isLink
        onPress={() => {
          const notify = Notify.show({ message: '处理中...', duration: 0 })
          setTimeout(() => {
            notify.config({ type: 'success', message: '完成', duration: 1500 })
          }, 1000)
        }}
      />
      <Cell title="关闭所有通知" isLink onPress={() => Notify.clear()} />
    </>
  )
}

