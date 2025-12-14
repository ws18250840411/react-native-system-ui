import React from 'react'
import { Search, Toast } from 'react-native-system-ui'

export default function SearchEventDemo() {
  const [value, setValue] = React.useState('')
  return (
    <Search
      value={value}
      onChange={setValue}
      placeholder="请输入搜索关键词"
      showAction
      onSearch={val => {
        Toast.info(val)
        setValue(val)
      }}
      onCancel={() => {
        Toast.info('取消')
        setValue('')
      }}
      onClear={() => {
        Toast.info('清除')
        setValue('')
      }}
      onClickInput={() => {
        Toast.info('点击输入区域时触发')
      }}
    />
  )
}
