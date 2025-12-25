import React from 'react'
import { Cell, ImagePreview } from 'react-native-system-ui'
import { Text } from 'react-native'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewCustomIndexDemo() {
  return (
    <Cell.Group>
      <Cell
        title="自定义页码"
        isLink
        onPress={() =>
          ImagePreview.open({
            images,
            showIndex: true,
            indexRender: ({ index, len }) => (
              <Text style={{ color: '#fff' }}>{`${index + 1} / ${len}`}</Text>
            ),
          })
        }
      />
    </Cell.Group>
  )
}
