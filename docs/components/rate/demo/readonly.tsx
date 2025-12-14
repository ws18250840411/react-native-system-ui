import React from 'react'
import { Rate } from 'react-native-system-ui'

export default function RateReadonlyDecimalDemo() {
  const [value, setValue] = React.useState(3.3)
  return <Rate value={value} onChange={setValue} readOnly allowHalf />
}

