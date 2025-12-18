import React from 'react'

import { Dialog, Uploader } from 'react-native-system-ui'

import { useNativeImagePickerUpload } from './utils'

const demoData = [
  {
    url: 'https://img.yzcdn.cn/vant/sand.jpg',
    filename: '图片名称',
  },
  {
    url: 'https://img.yzcdn.cn/vant/tree.jpg',
    filename: '图片名称',
  },
]

export default () => {
  const onUpload = useNativeImagePickerUpload()

  return (
    <Uploader
      defaultValue={demoData}
      onUpload={onUpload}
      onDelete={() => Dialog.confirm({ title: '提示', message: '确认删除?🤔' })}
    />
  )
}

