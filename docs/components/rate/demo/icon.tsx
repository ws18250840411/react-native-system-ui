import React from 'react'
import { Icon, Rate } from 'react-native-system-ui'

export default function RateIconDemo() {
  const [value, setValue] = React.useState(3)
  return (
    <Rate
      icon={<Icon name="fire" />}
      voidIcon={<Icon name="fire-o" />}
      value={value}
      onChange={setValue}
    />
  )
}
