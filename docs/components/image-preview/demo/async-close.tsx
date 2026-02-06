import React from 'react'

import { Cell, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewAsyncCloseDemo() {
  return (
    <Cell.Group>
      <Cell
        title="异步关闭（2 秒后自动关闭）"
        isLink
        onPress={() => {
          const destroy = ImagePreview.open({ images })
          setTimeout(() => destroy(), 2000)
        }}
      />
    </Cell.Group>
  )
}
