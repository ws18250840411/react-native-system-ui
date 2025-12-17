import React from 'react'
import { View } from 'react-native'
import { List, Cell } from 'react-native-system-ui'

export default () => {
  const [data, setData] = React.useState(Array.from({ length: 20 }).map((_, i) => `条目 ${i + 1}`))
  const [finished, setFinished] = React.useState(false)

  const loadMore = async () => {
    await new Promise(resolve => setTimeout(resolve, 500))
    setData(prev => {
      if (prev.length >= 40) {
        setFinished(true)
        return prev
      }
      return prev.concat(Array.from({ length: 10 }).map((_, i) => `条目 ${prev.length + i + 1}`))
    })
  }

  return (
    <View style={{ height: 400 }}>
      <List onLoad={loadMore} finished={finished} finishedText="没有更多了">
        {data.map(item => (
          <Cell key={item} title={item} />
        ))}
      </List>
    </View>
  )
}
