import React from 'react'

import { Cell, Toast } from 'react-native-system-ui'

export default function ToastInteractionDemo() {
  return (
    <>
      <Cell
        title="禁止背景点击"
        isLink
        onPress={() => Toast.show({ message: '请求处理中...', forbidClick: true, duration: 1500 })}
      />
      <Cell
        title="展示遮罩"
        isLink
        onPress={() => Toast.show({ message: '带遮罩提示', overlay: true, duration: 1500 })}
      />
      <Cell
        title="点击遮罩关闭"
        isLink
        onPress={() =>
          Toast.show({
            message: '点击遮罩关闭',
            overlay: true,
            closeOnClickOverlay: true,
            duration: 0,
          })
        }
      />
      <Cell
        title="点击提示即可关闭"
        isLink
        onPress={() =>
          Toast.show({
            message: '点击我即可关闭',
            closeOnClick: true,
            duration: 0,
          })
        }
      />
    </>
  )
}
