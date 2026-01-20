import React from 'react'
import { FlatList, ScrollView, StyleSheet, View } from 'react-native'

import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { Cell, Tabs, Typography } from 'react-native-system-ui'

import { componentRegistry } from '@/demo/registry'

const FULLSCREEN_DEMO_SLUGS = new Set(['list', 'pull-refresh', 'area'])

export default function ComponentDemosScreen() {
  const router = useRouter()
  const { slug } = useLocalSearchParams<{ slug: string }>()
  const resolvedSlug = Array.isArray(slug) ? slug[0] : slug
  const entry = resolvedSlug ? componentRegistry[resolvedSlug] : undefined

  const title = entry?.title ?? resolvedSlug ?? '组件'
  const isIndexBar = resolvedSlug === 'index-bar'
  const isFullscreenDemo = resolvedSlug ? FULLSCREEN_DEMO_SLUGS.has(resolvedSlug) : false

  const indexBarDemos = React.useMemo(() => {
    if (!isIndexBar || !entry) return null
    const basic = entry.demos.find(d => d.id === 'basic')
    const custom = entry.demos.find(d => d.id === 'custom')
    const controlled = entry.demos.find(d => d.id === 'controlled')
    return { basic, custom, controlled }
  }, [entry, isIndexBar])

  if (entry && isFullscreenDemo) {
    const DemoComponent = entry.demos[0]?.Component
    return (
      <View style={styles.root}>
        <Stack.Screen options={{ title }} />
        <View style={styles.fullscreen}>
          {DemoComponent ? <DemoComponent /> : null}
        </View>
      </View>
    )
  }

  if (resolvedSlug === 'picker' && entry) {
    return (
      <View style={styles.root}>
        <Stack.Screen options={{ title }} />
        <View style={styles.indexBarWrapper}>
          <Tabs
            defaultActive={entry.demos[0]?.id}
            border={false}
            color="#3a7afe"
            titleActiveColor="#3a7afe"
            align="start"
            tabBarStyle={styles.indexBarTabBar}
          >
            {entry.demos.map(demo => {
              const DemoComponent = demo.Component
              return (
                <Tabs.TabPane key={demo.id} name={demo.id} title={demo.title}>
                  <View style={styles.sectionContent}>
                    <DemoComponent />
                  </View>
                </Tabs.TabPane>
              )
            })}
          </Tabs>
        </View>
      </View>
    )
  }

  if (isIndexBar && indexBarDemos?.basic && indexBarDemos?.custom) {
    return (
      <View style={styles.root}>
        <Stack.Screen options={{ title }} />
        <ScrollView contentContainerStyle={styles.content} nestedScrollEnabled={true}>
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
        </ScrollView>
      </View>
    )
  }

  const demos = entry
    ? resolvedSlug === 'swiper'
      ? entry.demos.filter(demo => demo.id !== 'vertical' && demo.id !== 'vertical-center')
      : entry.demos
    : []

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ title }} />
      {!entry ? (
        <View style={[styles.content, styles.pagePadding]}>
          <Typography.Text type="secondary">未找到该组件：{resolvedSlug}</Typography.Text>
        </View>
      ) : (
        <FlatList
          data={demos}
          keyExtractor={item => item.id}
          contentContainerStyle={[styles.content, { paddingTop: 12 }]}
          renderItem={({ item, index }) => {
            const DemoComponent = item.Component
            const isLast = index === demos.length - 1
            return (
              <View style={[styles.item, isLast ? styles.itemLast : null, { paddingHorizontal: 16 }]}>
                <Typography.Text style={styles.sectionTitle}>{item.title}</Typography.Text>
                <View style={styles.sectionContent}>
                  <DemoComponent />
                </View>
              </View>
            )
          }}
          ListFooterComponent={
            resolvedSlug === 'swiper' ? (
              <View style={styles.moreDemos}>
                <Cell.Group title="更多演示">
                  {entry.demos
                    .filter(demo => demo.id === 'vertical' || demo.id === 'vertical-center')
                    .map(demo => (
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
            ) : null
          }
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f7f8fa',
  },
  fullscreen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    paddingBottom: 24,
  },
  pagePadding: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  indexBarWrapper: {
    paddingTop: 12,
  },
  indexBarTabBar: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
  },
  indexBarDemoContent: {
    paddingHorizontal: 0,
    paddingBottom: 12,
    backgroundColor: '#ffffff',
  },
  moreDemos: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  item: {
    marginBottom: 20,
  },
  itemLast: {
    marginBottom: 0,
  },
  sectionTitle: {
    paddingVertical: 12,
    fontSize: 14,
    fontWeight: '700',
    color: '#323233',
  },
  sectionContent: {
    width: '100%',
  },
})
