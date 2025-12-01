import React from 'react'
import { Button, Icon, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpg',
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpg',
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpg',
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
        closeIcon={<Icon name="close" color="#fff" size={18} />}
        closeOnlyClickCloseIcon
        onClose={() => setVisible(false)}
      />
    </>
  )
}
