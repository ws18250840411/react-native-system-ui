import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

import { useRouter } from 'expo-router'
import { Cell, Space, Typography } from 'react-native-system-ui'

export default function AboutScreen() {
  const router = useRouter()
  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <Space direction="vertical" gap={12}>
        <Typography.Title level={2}>RnSystemUi</Typography.Title>
        <Typography.Text type="secondary">
          用于在原生端（iOS/Android）跑 react-native-system-ui 的全部组件 Demo。
        </Typography.Text>

        <View style={styles.block}>
          <Cell.Group title="快速入口">
            <Cell title="组件列表" isLink onPress={() => router.push('/components')} />
          </Cell.Group>
        </View>
      </Space>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f7f8fa',
  },
  content: {
    padding: 12,
    paddingBottom: 24,
  },
  block: {
    marginTop: 12,
  },
})
