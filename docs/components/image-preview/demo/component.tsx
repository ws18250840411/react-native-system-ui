import React from 'react'

import { Cell, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewComponentDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <>
      <Cell.Group>
        <Cell title="组件调用" isLink onPress={() => setVisible(true)} />
      </Cell.Group>
      <ImagePreview
        visible={visible}
        onClose={() => setVisible(false)}
        images={images}
        showIndicators
        showIndex={false}
      />
    </>
  )
}
