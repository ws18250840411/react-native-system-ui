import React from 'react'

import { Info, Star } from 'react-native-system-icon'
import { Cell, Toast } from 'react-native-system-ui'

export default function ToastCustomIconDemo() {
  return (
    <Cell.Group>
      <Cell
        title="使用图标组件"
        isLink
        onPress={() =>
          Toast.show({
            message: '自定义图标',
            icon: <Info size={22} fill="#2563eb" color="#2563eb" />,
          })
        }
      />
      <Cell
        title="使用图片"
        isLink
        onPress={() =>
          Toast.show({
            message: '也可以放图片',
            icon: <Star size={22} fill="#fbbf24" color="#fbbf24" />,
            duration: 1500,
          })
        }
      />
    </Cell.Group>
  )
}
