import React from 'react'
import { ConfigProvider, Space, Text } from 'react-native-system-ui'

export default function TextOverrideDemo() {
  return (
    <ConfigProvider theme={{ foundations: { typography: { fontFamily: 'System' } } }}>
      <Space direction="vertical" gap={12}>
        <Text>跟随主题字体</Text>
        <Text style={{ fontFamily: 'monospace' }}>style.fontFamily 可局部覆盖主题字体</Text>
      </Space>
    </ConfigProvider>
  )
}
