import React from 'react'
import { Fire, FireO } from 'react-native-system-icon'
import { Rate } from 'react-native-system-ui'

export default function RateIconDemo() {
  const [value, setValue] = React.useState(3)
  return (
    <Rate
      icon={<Fire />}
      voidIcon={<FireO />}
      value={value}
      onChange={setValue}
    />
  )
}
