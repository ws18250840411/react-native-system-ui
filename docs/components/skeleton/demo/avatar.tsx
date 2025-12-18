import React from 'react'
import { Skeleton, Switch, Flex, Typography } from 'react-native-system-ui'

export default () => {
  const [loading, setLoading] = React.useState(true)
  return (
    <>
      <Switch value={loading} onValueChange={setLoading} text={loading ? '加载中' : '已加载'} />
      <Skeleton avatar title row={2} loading={loading} style={{ marginTop: 12 }}>
        <Flex align="center" gap={12}>
            <Skeleton avatarSize={48} avatarShape="round" />
          <Flex direction="column" gap={4} style={{ flex: 1 }}>
            <Typography.Title level={5}>React Native System UI</Typography.Title>
            <Typography.Text color="#888">跨平台的一致体验。</Typography.Text>
          </Flex>
        </Flex>
      </Skeleton>
    </>
  )
}
