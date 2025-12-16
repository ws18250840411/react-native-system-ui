import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { Cell, Typography } from 'react-native-system-ui'

import { componentRegistry } from '@/demo/registry'

const USE_DEMO_LIST_SLUGS = new Set(['list', 'pull-refresh', 'index-bar'])

export default function ComponentDemosScreen() {
  const router = useRouter()
  const { slug } = useLocalSearchParams<{ slug: string }>()
  const resolvedSlug = Array.isArray(slug) ? slug[0] : slug
  const entry = resolvedSlug ? componentRegistry[resolvedSlug] : undefined

  const title = entry?.title ?? resolvedSlug ?? '组件'
  const useDemoList = resolvedSlug ? USE_DEMO_LIST_SLUGS.has(resolvedSlug) : false

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ title }} />
      <ScrollView contentContainerStyle={styles.content}>
        {!entry ? (
          <View style={styles.pagePadding}>
            <Typography.Text type="secondary">未找到该组件：{resolvedSlug}</Typography.Text>
          </View>
        ) : useDemoList ? (
          <View style={styles.pagePadding}>
            <Cell.Group title="代码演示">
              {entry.demos.map(demo => (
                <Cell
                  key={demo.id}
                  title={demo.title}
                  isLink
                  onPress={() =>
                    router.push({
                      pathname: '/components/[slug]/[demo]',
                      params: { slug: resolvedSlug, demo: demo.id },
                    })
                  }
                />
              ))}
            </Cell.Group>
          </View>
        ) : (
          <>
            {entry.demos.map((demo, index) => {
              const DemoComponent = demo.Component
              const isLast = index === entry.demos.length - 1
              return (
                <View key={demo.id} style={[styles.item, isLast ? styles.itemLast : null]}>
                  <Typography.Text style={styles.sectionTitle}>{demo.title}</Typography.Text>
                  <View style={styles.sectionContent}>
                    <DemoComponent />
                  </View>
                </View>
              )
            })}
          </>
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f6f8fc',
  },
  content: {
    paddingBottom: 20,
  },
  pagePadding: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  item: {
    marginBottom: 20,
  },
  itemLast: {
    marginBottom: 0,
  },
  sectionTitle: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 14,
    fontWeight: '700',
    color: '#323233',
  },
  sectionContent: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
})
