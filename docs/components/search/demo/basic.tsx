import React from 'react'
import { Search } from 'react-native-system-ui'

const BasicSearchDemo = () => {
  const [value, setValue] = React.useState('')

  return (
    <Search
      placeholder='请输入搜索关键词'
      value={value}
      onChangeText={setValue}
      onSearch={text => console.log('search', text)}
    />
  )
}

export default BasicSearchDemo
