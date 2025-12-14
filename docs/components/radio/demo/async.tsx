import React from 'react'
import { Text } from 'react-native'
import { Radio, Space, Toast } from 'react-native-system-ui'

export default function RadioAsyncDemo() {
  const [value, setValue] = React.useState('1')
  const [loading, setLoading] = React.useState(false)

  const handleChange = React.useCallback((next: string | number) => {
    setLoading(true)
    Toast.show({ message: '提交中...', duration: 0 })
    setTimeout(() => {
      setValue(String(next))
      setLoading(false)
      Toast.clear()
    }, 800)
  }, [])

  return (
    <Space direction="vertical" gap={12}>
      <Radio.Group value={value} onChange={handleChange} disabled={loading}>
        <Radio name="1">单选框 1</Radio>
        <Radio name="2">单选框 2</Radio>
      </Radio.Group>
      <Text style={{ color: '#888' }}>
        当前选中：{loading ? '请求中...' : value}
      </Text>
    </Space>
  )
}

