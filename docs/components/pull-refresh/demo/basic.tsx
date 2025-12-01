import React from 'react'
import { Cell, PullRefresh } from 'react-native-system-ui'

export default () => {
  const [items, setItems] = React.useState(Array.from({ length: 10 }).map((_, i) => `条目 ${i + 1}`))

  const handleRefresh = async () => {
    await new Promise(resolve => setTimeout(resolve, 800))
    setItems(Array.from({ length: 10 }).map((_, i) => `条目 ${i + 1}`))
  }

  return (
    <PullRefresh onRefresh={handleRefresh}>
      {items.map(item => (
        <Cell key={item} title={item} />
      ))}
    </PullRefresh>
  )
}
