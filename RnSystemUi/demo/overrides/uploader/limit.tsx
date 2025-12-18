import React from 'react'

import { Toast, Uploader } from 'react-native-system-ui'

import { useNativeImagePickerUpload } from './utils'

const defaultValue = [
  {
    url: 'https://img.yzcdn.cn/vant/sand.jpg',
    filename: '图片名称',
  },
]

export default () => {
  const handleOversize = React.useCallback(() => {
    Toast.info('文件大小不能超过15kb')
  }, [])

  const onUpload = useNativeImagePickerUpload({
    multiple: true,
    maxSize: 15 * 1024,
    onOversize: handleOversize,
  })

  return (
    <Uploader
      multiple
      defaultValue={defaultValue}
      maxCount={2}
      maxSize={15 * 1024}
      onOversize={handleOversize}
      onUpload={onUpload}
    />
  )
}

