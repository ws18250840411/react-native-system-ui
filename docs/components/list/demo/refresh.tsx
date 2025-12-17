import React from 'react'
import { RefreshControl, View } from 'react-native'

import { Cell, List } from 'react-native-system-ui'

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const createItems = (start: number, count: number) =>
  Array.from({ length: count }).map((_, i) => `条目 ${start + i}`)

export default () => {
  const [items, setItems] = React.useState(() => createItems(1, 10))
  const [finished, setFinished] = React.useState(false)
  const [refreshing, setRefreshing] = React.useState(false)

  const onLoad = async () => {
    await sleep(500)
    setItems(prev => {
      const next = prev.concat(createItems(prev.length + 1, 10))
      if (next.length >= 40) {
        setFinished(true)
      }
      return next
    })
  }

  const onRefresh = async () => {
    setRefreshing(true)
    setFinished(false)
    await sleep(800)
    setItems(createItems(1, 10))
    setRefreshing(false)
  }

  return (
    <View style={{ height: 400 }}>
      <List
        onLoad={onLoad}
        finished={finished}
        finishedText="没有更多了"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {items.map(item => (
          <Cell key={item} title={item} />
        ))}
      </List>
    </View>
  )
}

