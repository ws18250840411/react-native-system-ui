import React from 'react'
import { Cell, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewBasicDemo() {
  return (
    <Cell.Group>
      <Cell
        title="预览图片"
        isLink
        onPress={() =>
          ImagePreview.open({
            images,
            onChange: index => console.log(`当前展示第${index + 1}张`),
          })
        }
      />
    </Cell.Group>
  )
}
