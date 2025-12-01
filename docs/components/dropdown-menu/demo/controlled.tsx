import React from 'react'
import { DropdownMenu, Text } from 'react-native-system-ui'

const options = [
  { label: '全部行业', value: 'all' },
  { label: '零售', value: 'retail' },
  { label: '教育', value: 'education' },
]

export default () => {
  const [value, setValue] = React.useState('all')
  return (
    <>
      <DropdownMenu>
        <DropdownMenu.Item options={options} value={value} onChange={setValue} />
      </DropdownMenu>
      <Text style={{ marginTop: 12 }}>当前选择：{value}</Text>
    </>
  )
}
