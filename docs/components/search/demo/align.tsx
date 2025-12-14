import React from 'react'
import { Search } from 'react-native-system-ui'

export default function SearchAlignDemo() {
  const [value, setValue] = React.useState('')
  return (
    <Search
      value={value}
      onChange={setValue}
      align="center"
      placeholder="请输入搜索关键词"
    />
  )
}

