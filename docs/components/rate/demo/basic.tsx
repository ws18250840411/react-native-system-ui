import React from 'react'
import { Rate } from 'react-native-system-ui'

export default function RateBasicDemo() {
  const [value, setValue] = React.useState(3)
  return <Rate value={value} onChange={setValue} />
}
