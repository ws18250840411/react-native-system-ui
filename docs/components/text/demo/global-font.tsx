import React from 'react'
import { ConfigProvider, Space, Text } from 'react-native-system-ui'

export default function TextGlobalFontDemo() {
  return (
    <ConfigProvider theme={{ foundations: { typography: { fontFamily: 'System' } } }}>
      <Space direction="vertical" gap={12}>
        <Text>本段文案自动使用 ConfigProvider 下配置的全局字体。</Text>
        <Text style={{ fontSize: 16, color: '#666' }}>与 RN 原生 Text API 一致，可叠加 style。</Text>
      </Space>
    </ConfigProvider>
  )
}
