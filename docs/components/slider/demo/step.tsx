import React from 'react'
import { Slider, Toast } from 'react-native-system-ui'

export default function SliderStepDemo() {
  const [value, setValue] = React.useState(10)
  return (
    <Slider
      step={10}
      value={value}
      onChange={val => setValue(val as number)}
      onChangeAfter={v => Toast.info(`值：${Array.isArray(v) ? v.join(' ~ ') : v}`)}
    />
  )
}
