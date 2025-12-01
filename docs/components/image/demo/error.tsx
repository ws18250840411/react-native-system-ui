import React from 'react'
import { Image } from 'react-native-system-ui'
import { Text } from 'react-native'

export default () => (
  <Image
    width={120}
    height={120}
    src="https://example.com/404.png"
    fallback={<Text>加载失败</Text>}
  />
)
