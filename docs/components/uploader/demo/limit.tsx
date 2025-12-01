import React from 'react'
import { Text } from 'react-native'
import { Uploader } from 'react-native-system-ui'

const mockImages = [
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-4.jpg',
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-5.jpg',
]

export default () => {
  const [files, setFiles] = React.useState([
    { url: mockImages[0] },
  ])

  const handleUpload = React.useCallback(async () => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const next = mockImages[(files.length + 1) % mockImages.length]
    return { url: next }
  }, [files.length])

  const handleDelete = React.useCallback(async () => {
    await new Promise(resolve => setTimeout(resolve, 200))
    return true
  }, [])

  return (
    <>
      <Uploader
        value={files}
        onChange={setFiles}
        onUpload={handleUpload}
        onDelete={handleDelete}
        maxCount={3}
        uploadText={`还可上传 ${Math.max(0, 3 - files.length)} 张`}
      />
      <Text style={{ marginTop: 8, color: '#888' }}>最多选择 3 张图片。</Text>
    </>
  )
}
