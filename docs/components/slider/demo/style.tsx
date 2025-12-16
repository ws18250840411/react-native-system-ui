import React from 'react'
import { Slider, Toast } from 'react-native-system-ui'

export default function SliderStyleDemo() {
  const [value, setValue] = React.useState(10)
  return (
    <Slider
      barHeight={4}
      activeColor="#ee0a24"
      value={value}
      onChange={setValue}
      onChangeAfter={v => Toast.info(`值：${Array.isArray(v) ? v.join(' ~ ') : v}`)}
    />
  )
}
