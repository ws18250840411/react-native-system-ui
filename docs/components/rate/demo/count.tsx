import React from 'react'
import { Rate } from 'react-native-system-ui'

export default function RateCountDemo() {
  const [value, setValue] = React.useState(4)
  return <Rate value={value} onChange={setValue} count={8} />
}

