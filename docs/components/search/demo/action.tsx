import React from 'react'
import { Text, View } from 'react-native'
import { Search } from 'react-native-system-ui'

const ActionSearchDemo = () => {
  const [value, setValue] = React.useState('咖啡')
  const [status, setStatus] = React.useState('')

  return (
    <View>
      <Search
        value={value}
        showAction
        clearable
        placeholder='搜索商品、品牌'
        onChangeText={setValue}
        onSearch={text => setStatus('搜索：' + text)}
        onCancel={() => setStatus('搜索已取消')}
      />
      {status ? <Text style={{ marginTop: 12 }}>{status}</Text> : null}
    </View>
  )
}

export default ActionSearchDemo
