import React from 'react'

import { Cell, Icon, Toast } from 'react-native-system-ui'

export default function ToastCustomIconDemo() {
  return (
    <Cell.Group title="自定义图标" card>
      <Cell
        title="使用 Icon"
        isLink
        onPress={() =>
          Toast.show({
            message: '自定义图标',
            icon: <Icon name="info" color="#2563eb" size={22} />,
          })
        }
      />
      <Cell
        title="使用图片"
        isLink
        onPress={() =>
          Toast.show({
            message: '也可以放图片',
            icon: <Icon name="star" color="#fbbf24" size={22} />,
            duration: 1500,
          })
        }
      />
    </Cell.Group>
  )
}
