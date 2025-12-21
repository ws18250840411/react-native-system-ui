import React from 'react'
import { Close } from 'react-native-system-icon'
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
      <Button text="展示控制按钮" onPress={() => setVisible(true)} />
      <ImagePreview
        visible={visible}
        images={images}
        startPosition={1}
        showIndicators
        closeable
        closeIcon={<Close size={18} fill="#fff" color="#fff" />}
        closeOnlyClickCloseIcon
        onClose={() => setVisible(false)}
      />
    </>
  )
}
