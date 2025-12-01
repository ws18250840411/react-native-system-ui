import React from 'react'
import { Text } from 'react-native'
import { Uploader } from 'react-native-system-ui'

const mockImages = [
  'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
  'https://fastly.jsdelivr.net/npm/@vant/assets/cat-2.jpeg',
]

export default () => {
  const [files, setFiles] = React.useState([
    { url: mockImages[0] },
    { url: mockImages[1], status: 'pending' as const },
    { url: mockImages[0], status: 'failed' as const },
  ])

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setFiles(prev => prev.map(item => (item.status === 'pending' ? { ...item, status: undefined } : item)))
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Uploader
      value={files}
      onChange={setFiles}
      showUpload={false}
      previewCoverRender={item => (
        item === files[0]
          ? (
            <Text style={{ color: '#fff', fontWeight: '600' }}>封面</Text>
          )
          : null
      )}
      statusTextRender={status => (status === 'pending' ? '上传中…' : '失败')}
    />
  )
}
