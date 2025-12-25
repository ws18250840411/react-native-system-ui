import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { Cell, Tabs, Typography } from 'react-native-system-ui'

import { componentRegistry } from '@/demo/registry'

const USE_DEMO_LIST_SLUGS = new Set(['list', 'pull-refresh'])

export default function ComponentDemosScreen() {
  const router = useRouter()
  const { slug } = useLocalSearchParams<{ slug: string }>()
  const resolvedSlug = Array.isArray(slug) ? slug[0] : slug
  const entry = resolvedSlug ? componentRegistry[resolvedSlug] : undefined

  const title = entry?.title ?? resolvedSlug ?? '组件'
  const isIndexBar = resolvedSlug === 'index-bar'
  const useDemoList = resolvedSlug ? USE_DEMO_LIST_SLUGS.has(resolvedSlug) : false

  const indexBarDemos = React.useMemo(() => {
    if (!isIndexBar || !entry) return null
    const basic = entry.demos.find(d => d.id === 'basic')
    const custom = entry.demos.find(d => d.id === 'custom')
    const controlled = entry.demos.find(d => d.id === 'controlled')
    return { basic, custom, controlled }
  }, [entry, isIndexBar])

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ title }} />
      <ScrollView contentContainerStyle={styles.content}>
        {!entry ? (
          <View style={styles.pagePadding}>
            <Typography.Text type="secondary">未找到该组件：{resolvedSlug}</Typography.Text>
          </View>
        ) : isIndexBar && indexBarDemos?.basic && indexBarDemos?.custom ? (
          <View style={styles.indexBarWrapper}>
            <Tabs
              defaultActive={indexBarDemos.basic.id}
              border={false}
              color="#3a7afe"
              titleActiveColor="#3a7afe"
              align="start"
              tabStyle={{ flexBasis: '50%', flexGrow: 0 }}
              tabBarStyle={styles.indexBarTabBar}
            >
              <Tabs.TabPane name={indexBarDemos.basic.id} title={indexBarDemos.basic.title}>
                <View style={styles.indexBarDemoContent}>
                  <indexBarDemos.basic.Component />
                </View>
              </Tabs.TabPane>
              <Tabs.TabPane name={indexBarDemos.custom.id} title={indexBarDemos.custom.title}>
                <View style={styles.indexBarDemoContent}>
                  <indexBarDemos.custom.Component />
                </View>
              </Tabs.TabPane>
            </Tabs>

            {indexBarDemos.controlled ? (
              <View style={styles.moreDemos}>
                <Cell.Group title="更多演示">
                  <Cell
                    title={indexBarDemos.controlled.title}
                    isLink
                    onPress={() =>
                      router.push({
                        pathname: '/components/[slug]/[demo]',
                        params: { slug: resolvedSlug, demo: indexBarDemos.controlled!.id },
                      })
                    }
                  />
                </Cell.Group>
              </View>
            ) : null}
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
  indexBarWrapper: {
    paddingTop: 10,
  },
  indexBarTabBar: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
  },
  indexBarDemoContent: {
    paddingHorizontal: 0,
    paddingBottom: 10,
    backgroundColor: '#ffffff',
  },
  moreDemos: {
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
