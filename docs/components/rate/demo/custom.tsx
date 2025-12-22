import React from 'react'
import { Rate } from 'react-native-system-ui'

export default function RateCustomDemo() {
  const [value, setValue] = React.useState(3)
  return (
    <Rate
      size={24}
      color="#3f45ff"
      voidColor="#111"
      value={value}
      onChange={setValue}
    />
  )
}

