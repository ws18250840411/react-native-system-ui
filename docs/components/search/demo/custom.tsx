import React from 'react'
import { Text } from 'react-native'
import { Search } from 'react-native-system-ui'

const CustomSearchDemo = () => {
  const [value, setValue] = React.useState('')

  return (
    <Search
      label='地址'
      shape='round'
      background='#f7f8fa'
      placeholder='输入城市或地标'
      value={value}
      onChangeText={setValue}
      action={<Text style={{ color: '#4770ff' }}>地图</Text>}
    />
  )
}

export default CustomSearchDemo
