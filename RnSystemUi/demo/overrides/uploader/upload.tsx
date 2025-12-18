import React from 'react'

import { Uploader } from 'react-native-system-ui'

import { uploadFromUri, useNativeImagePickerUpload } from './utils'

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
  const pick = useNativeImagePickerUpload()

  const onUpload = React.useCallback(async () => {
    const picked = await pick()
    if (!picked) return
    const files = Array.isArray(picked) ? picked : [picked]

    const uploaded = await Promise.all(
      files.map(async item => {
        const file = item.file as any
        if (!file?.uri) return item
        const remote = await uploadFromUri(file)
        return { ...item, ...remote, url: remote?.url ?? item.url }
      })
    )

    return uploaded
  }, [pick])

  return <Uploader defaultValue={demoData} onUpload={onUpload} />
}

