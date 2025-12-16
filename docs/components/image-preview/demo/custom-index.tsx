import React from 'react'
import { Button, ImagePreview } from 'react-native-system-ui'
import { Text } from 'react-native'

const images = [
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpg',
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpg',
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpg',
]

export default () => {
  const [visible, setVisible] = React.useState(false)

  return (
    <>
      <Button text="自定义索引" onPress={() => setVisible(true)} />
      <ImagePreview
        visible={visible}
        images={images}
        showIndex
        indexRender={({ index, len }) => (
          <Text style={{ color: '#fff' }}>{`${index + 1} / ${len}`}</Text>
        )}
        onClose={() => setVisible(false)}
      />
    </>
  )
}
