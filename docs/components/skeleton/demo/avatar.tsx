import React from 'react'
import { Skeleton, Switch, Space, Typography } from 'react-native-system-ui'

export default function SkeletonAvatarDemo() {
  const [loading, setLoading] = React.useState(true)
  return (
    <>
      <Space align="center" gap={8}>
        <Switch checked={loading} onChange={val => setLoading(val)} />
        <Typography.Text color="#888">{loading ? '加载中' : '已加载'}</Typography.Text>
      </Space>
      <Skeleton avatar title row={2} loading={loading} style={{ marginTop: 12 }}>
        <Space align="center" gap={12}>
          <Skeleton avatarSize={48} avatarShape="round" />
          <Space direction="vertical" gap={4} style={{ flex: 1 }}>
            <Typography.Title level={5}>React Native System UI</Typography.Title>
            <Typography.Text color="#888">跨平台的一致体验。</Typography.Text>
          </Space>
        </Space>
      </Skeleton>
    </>
  )
}
