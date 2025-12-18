import React from 'react'
import { View } from 'react-native'

import { Button, Cell, Space, SwipeCell, type SwipeCellRef } from 'react-native-system-ui'

export default function SwipeCellControlDemo() {
  const ref = React.useRef<SwipeCellRef | null>(null)

  return (
    <Space direction="vertical" gap={12}>
      <SwipeCell
        ref={ref}
        right={
          <View
            style={{
              width: 80,
              height: '100%',
              backgroundColor: '#ee0a24',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        }
      >
        <Cell title="用按钮控制打开/关闭" border={false} />
      </SwipeCell>
      <Space>
        <Button size="small" type="primary" onPress={() => ref.current?.open('right')}>
          打开右侧
        </Button>
        <Button size="small" onPress={() => ref.current?.close()}>
          关闭
        </Button>
      </Space>
    </Space>
  )
}

