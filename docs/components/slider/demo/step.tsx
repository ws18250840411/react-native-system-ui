import React from 'react'
import { Slider, Toast } from 'react-native-system-ui'

export default function SliderStepDemo() {
  const [value, setValue] = React.useState(10)
  return (
    <Slider
      step={10}
      value={value}
      onChange={setValue}
      onChangeAfter={v => Toast.info(`当前值：${v}`)}
    />
  )
}
