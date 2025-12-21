import React from 'react'

import { Cell, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewImperativeDemo() {
  const destroyRef = React.useRef<null | (() => void)>(null)

  const open = (startPosition = 0) => {
    destroyRef.current?.()
    destroyRef.current = ImagePreview.open({
      images,
      startPosition,
      showIndicators: true,
    })
  }

  const close = () => {
    destroyRef.current?.()
    destroyRef.current = null
  }

  const clear = () => {
    ImagePreview.clear()
    destroyRef.current = null
  }

  return (
    <Cell.Group title="静态调用" card>
      <Cell title="打开预览" isLink onPress={() => open(0)} />
      <Cell title="从第二张开始" isLink onPress={() => open(1)} />
      <Cell title="关闭当前" isLink onPress={close} />
      <Cell title="清空所有" isLink onPress={clear} />
    </Cell.Group>
  )
}
