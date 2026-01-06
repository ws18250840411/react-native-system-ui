import React from 'react'
import { RefreshControl, View, useWindowDimensions } from 'react-native'
import { Cell, List, Tabs } from 'react-native-system-ui'

export default () => {
  const { height: windowHeight } = useWindowDimensions()
  const containerHeight = Math.max(420, windowHeight - 50)

  const [basicItems, setBasicItems] = React.useState(
    Array.from({ length: 20 }).map((_, i) => `条目 ${i + 1}`),
  )
  const [basicFinished, setBasicFinished] = React.useState(false)

  const [errorItems, setErrorItems] = React.useState<string[]>([])
  const [errorFinished, setErrorFinished] = React.useState(false)
  const failedOnceRef = React.useRef(true)

  const [refreshItems, setRefreshItems] = React.useState<string[]>(
    Array.from({ length: 10 }).map((_, i) => `条目 ${i + 1}`),
  )
  const [refreshFinished, setRefreshFinished] = React.useState(false)
  const [refreshing, setRefreshing] = React.useState(false)

  const loadMoreBasic = async () => {
    await new Promise(resolve => setTimeout(resolve, 500))
    setBasicItems(prev => {
      if (prev.length >= 40) {
        setBasicFinished(true)
        return prev
      }
      return prev.concat(Array.from({ length: 10 }).map((_, i) => `条目 ${prev.length + i + 1}`))
    })
  }

  const loadMoreError = async () => {
    await new Promise(resolve => setTimeout(resolve, 600))
    if (failedOnceRef.current) {
      failedOnceRef.current = false
      throw new Error('load failed')
    }

    setErrorItems(prev => {
      const next = prev.concat(Array.from({ length: 10 }).map((_, i) => `条目 ${prev.length + i + 1}`))
      if (next.length >= 30) {
        setErrorFinished(true)
      }
      return next
    })
  }

  const loadMoreRefresh = async () => {
    await new Promise(resolve => setTimeout(resolve, 500))
    setRefreshItems(prev => {
      const next = prev.concat(Array.from({ length: 10 }).map((_, i) => `条目 ${prev.length + i + 1}`))
      if (next.length >= 40) {
        setRefreshFinished(true)
      }
      return next
    })
  }

  const onRefresh = async () => {
    setRefreshing(true)
    setRefreshFinished(false)
    await new Promise(resolve => setTimeout(resolve, 800))
    setRefreshItems(Array.from({ length: 10 }).map((_, i) => `条目 ${i + 1}`))
    setRefreshing(false)
  }

  return (
    <Tabs
      defaultActive="basic"
      color="#3a7afe"
      background="#ffffff"
      border={false}
      titleActiveColor="#3a7afe"
      titleInactiveColor="#323233"
      align="start"
    >
      <Tabs.TabPane name="basic" title="基础用法">
        <View style={{ height: containerHeight }}>
          <List onLoad={loadMoreBasic} finished={basicFinished} finishedText="没有更多了">
            {basicItems.map(item => (
              <Cell key={item} title={item} />
            ))}
          </List>
        </View>
      </Tabs.TabPane>

      <Tabs.TabPane name="error" title="错误提示">
        <View style={{ height: containerHeight }}>
          <List
            onLoad={loadMoreError}
            finished={errorFinished}
            finishedText="没有更多了"
            errorText="请求失败，点击重新加载"
          >
            {errorItems.map(item => (
              <Cell key={item} title={item} />
            ))}
          </List>
        </View>
      </Tabs.TabPane>

      <Tabs.TabPane name="refresh" title="下拉刷新">
        <View style={{ height: containerHeight }}>
          <List
            onLoad={loadMoreRefresh}
            finished={refreshFinished}
            finishedText="没有更多了"
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          >
            {refreshItems.map(item => (
              <Cell key={item} title={item} />
            ))}
          </List>
        </View>
      </Tabs.TabPane>
    </Tabs>
  )
}
