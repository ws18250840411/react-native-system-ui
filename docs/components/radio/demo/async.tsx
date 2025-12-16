import React from 'react'
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
        <Radio name="1">单选框1</Radio>
        <Radio name="2">单选框2</Radio>
      </Radio.Group>
    </Space>
  )
}
