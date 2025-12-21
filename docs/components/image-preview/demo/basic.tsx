import React from 'react'
import { Button, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default () => {
  const [visible, setVisible] = React.useState(false)

  return (
    <>
      <Button text="预览图片" onPress={() => setVisible(true)} />
      <ImagePreview
        visible={visible}
        images={images}
        onClose={() => setVisible(false)}
      />
    </>
  )
}
