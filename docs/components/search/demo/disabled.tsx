import React from 'react'
import { Search } from 'react-native-system-ui'

export default function SearchDisabledDemo() {
  const [value, setValue] = React.useState('')
  return (
    <Search
      disabled
      value={value}
      onChange={setValue}
      placeholder="请输入搜索关键词"
    />
  )
}

