import React from 'react'
import { Slider, Toast } from 'react-native-system-ui'

export default function SliderBasicDemo() {
  const [value, setValue] = React.useState(10)
  return (
    <Slider
      value={value}
      onChange={setValue}
      onChangeAfter={v => Toast.info(`当前值：${v}`)}
    />
  )
}
