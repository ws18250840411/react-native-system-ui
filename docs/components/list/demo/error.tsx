import React from 'react'
import { View } from 'react-native'

import { Cell, List } from 'react-native-system-ui'

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export default () => {
  const [items, setItems] = React.useState<string[]>([])
  const [finished, setFinished] = React.useState(false)
  const failedOnceRef = React.useRef(true)

  const onLoad = async () => {
    await sleep(600)
    if (failedOnceRef.current) {
      failedOnceRef.current = false
      throw new Error('load failed')
    }

    setItems(prev => {
      const next = prev.concat(
        Array.from({ length: 10 }).map((_, i) => `条目 ${prev.length + i + 1}`),
      )
      if (next.length >= 30) {
        setFinished(true)
      }
      return next
    })
  }

  return (
    <View style={{ height: 400 }}>
      <List
        onLoad={onLoad}
        finished={finished}
        finishedText="没有更多了"
        errorText="请求失败，点击重新加载"
      >
        {items.map(item => (
          <Cell key={item} title={item} />
        ))}
      </List>
    </View>
  )
}

