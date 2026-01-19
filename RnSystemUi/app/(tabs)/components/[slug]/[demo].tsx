import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

import { Stack, useLocalSearchParams } from 'expo-router'
import { Typography } from 'react-native-system-ui'

import { componentRegistry } from '@/demo/registry'

const NO_SCROLL_WRAPPER = new Set(['list', 'pull-refresh', 'index-bar', 'picker'])

export default function ComponentDemoRunnerScreen() {
  const { slug, demo } = useLocalSearchParams<{ slug: string; demo: string }>()
  const resolvedSlug = Array.isArray(slug) ? slug[0] : slug
  const resolvedDemo = Array.isArray(demo) ? demo[0] : demo

  const entry = resolvedSlug ? componentRegistry[resolvedSlug] : undefined
  const demoEntry = entry?.demos.find(item => item.id === resolvedDemo)

  const title = demoEntry?.title ?? resolvedDemo ?? 'Demo'

  if (!entry || !demoEntry || !resolvedSlug) {
    return (
      <View style={styles.root}>
        <Stack.Screen options={{ title: 'Demo' }} />
        <View style={styles.content}>
          <Typography.Text type="secondary">
            未找到 Demo：{resolvedSlug}/{resolvedDemo}
          </Typography.Text>
        </View>
      </View>
    )
  }

  const DemoComponent = demoEntry.Component
  const shouldDisableScrollWrapper =
    NO_SCROLL_WRAPPER.has(resolvedSlug) ||
    (resolvedSlug === 'swiper' && (resolvedDemo === 'vertical' || resolvedDemo === 'vertical-center'))

  if (shouldDisableScrollWrapper) {
    return (
      <View style={styles.root}>
        <Stack.Screen options={{ title }} />
        <View style={styles.fill}>
          <DemoComponent />
        </View>
      </View>
    )
  }

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content} nestedScrollEnabled={true}>
      <Stack.Screen options={{ title }} />
      <DemoComponent />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f7f8fa',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },
  fill: {
    flex: 1,
  },
})
