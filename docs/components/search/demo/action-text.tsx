import React from 'react'
import { Pressable, Text } from 'react-native'
import { Search, Toast } from 'react-native-system-ui'

export default function SearchActionTextDemo() {
  const [value, setValue] = React.useState('')

  return (
    <Search
      showAction
      label='地址'
      value={value}
      onChange={setValue}
      placeholder="请输入搜索关键词"
      actionText={
        <Pressable onPress={() => Toast.info(value)} accessibilityRole="button">
          <Text style={{ color: '#4770ff', fontWeight: '500' }}>搜索</Text>
        </Pressable>
      }
    />
  )
}
