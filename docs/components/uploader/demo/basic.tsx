import React from 'react'
import { Uploader } from 'react-native-system-ui'

const mockImages = [
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpg',
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpg',
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpg',
]

export default () => {
  const [files, setFiles] = React.useState([
    { url: mockImages[0] },
  ])

  const handleUpload = React.useCallback(async () => {
    const next = mockImages[Math.floor(Math.random() * mockImages.length)]
    await new Promise(resolve => setTimeout(resolve, 400))
    return { url: next }
  }, [])

  return (
    <Uploader
      value={files}
      onChange={setFiles}
      onUpload={handleUpload}
      uploadText="上传图片"
    />
  )
}
