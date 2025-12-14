import React from 'react'
import { Rate } from 'react-native-system-ui'

export default function RateHalfDemo() {
  const [value, setValue] = React.useState(3.5)
  return <Rate allowHalf value={value} onChange={setValue} />
}
