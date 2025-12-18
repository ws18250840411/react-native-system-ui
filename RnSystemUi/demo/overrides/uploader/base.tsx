import React from 'react'

import { Uploader } from 'react-native-system-ui'

import { useNativeImagePickerUpload } from './utils'

const defaultValue = [
  {
    url: 'https://img.yzcdn.cn/vant/sand.jpg',
  },
  {
    url: 'https://img.yzcdn.cn/vant/sand.text',
    filename: 'sand.text',
  },
]

export default () => {
  const onUpload = useNativeImagePickerUpload()
  return <Uploader accept="*" defaultValue={defaultValue} onUpload={onUpload} onChange={v => console.log(v)} />
}

