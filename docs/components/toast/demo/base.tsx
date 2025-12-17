import React from 'react'

import { Cell, Toast } from 'react-native-system-ui'

export default function ToastBasicDemo() {
  return (
    <>
      <Cell title="文字提示" isLink onPress={() => Toast.info('提示内容')} />
      <Cell
        title="加载提示"
        isLink
        onPress={() =>
          Toast.loading({
            message: '加载中...',
            forbidClick: true,
          })
        }
      />
      <Cell title="成功提示" isLink onPress={() => Toast.success('操作成功')} />
      <Cell title="失败提示" isLink onPress={() => Toast.fail('操作失败')} />
    </>
  )
}
