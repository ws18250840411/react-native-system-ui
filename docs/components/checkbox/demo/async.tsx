import React from 'react'
import { Text } from 'react-native'
import { Checkbox, Toast, Space } from 'react-native-system-ui'

export default function CheckboxAsyncDemo() {
  const [checked, setChecked] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const handleChange = React.useCallback((next: boolean) => {
    setLoading(true)
    Toast.show({ message: '提交中...', duration: 0 })
    setTimeout(() => {
      setChecked(next)
      setLoading(false)
      Toast.clear()
    }, 800)
  }, [])

  return (
    <Space direction="vertical" gap={12}>
      <Checkbox checked={checked} disabled={loading} onChange={handleChange}>
        受控 + 异步更新
      </Checkbox>
      <Text style={{ color: '#888' }}>
        当前状态：{loading ? '请求中...' : checked ? '已选中' : '未选中'}
      </Text>
    </Space>
  )
}
