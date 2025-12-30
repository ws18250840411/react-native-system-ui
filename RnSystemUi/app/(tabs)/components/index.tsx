import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

import { Stack, useRouter } from 'expo-router'
import { Cell, Search } from 'react-native-system-ui'

import { componentRegistry, menuGroups } from '@/demo/registry'

const normalize = (value: string) => value.trim().toLowerCase()

export default function ComponentsMenuScreen() {
  const router = useRouter()
  const [keyword, setKeyword] = React.useState('')
  const normalizedKeyword = normalize(keyword)

  const groups = React.useMemo(() => {
    return menuGroups
      .map(group => {
        const items = group.slugs
          .map(slug => ({
            slug,
            title: componentRegistry[slug]?.title ?? slug,
          }))
          .filter(item => {
            if (!normalizedKeyword) return true
            const haystack = `${item.slug} ${item.title}`.toLowerCase()
            return haystack.includes(normalizedKeyword)
          })

        return { title: group.title, items }
      })
      .filter(group => group.items.length > 0)
  }, [normalizedKeyword])

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ title: '组件' }} />
      <View style={styles.search}>
        <Search value={keyword} onChange={setKeyword} placeholder="搜索组件" background="transparent" />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {groups.map(group => (
          <View key={group.title} style={styles.group}>
            <Cell.Group title={group.title}>
              {group.items.map(item => (
                <Cell
                  key={item.slug}
                  title={item.title}
                  isLink
                  onPress={() =>
                    router.push({
                      pathname: '/components/[slug]',
                      params: { slug: item.slug },
                    })
                  }
                />
              ))}
            </Cell.Group>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f7f8fa',
  },
  search: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: '#f7f8fa',
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  group: {
    marginBottom: 16,
  },
})
