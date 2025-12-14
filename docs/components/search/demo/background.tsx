import React from 'react'
import { Search } from 'react-native-system-ui'

export default function SearchBackgroundDemo() {
  const [value, setValue] = React.useState('')
  return (
    <Search
      shape="round"
      background="#4fc08d"
      value={value}
      onChange={setValue}
      placeholder="请输入搜索关键词"
    />
  )
}

