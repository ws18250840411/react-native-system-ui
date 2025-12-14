import React from 'react'
import { Rate } from 'react-native-system-ui'
import { Fire, FireO } from '@react-vant/icons'

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

