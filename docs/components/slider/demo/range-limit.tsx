import React from 'react'
import { Slider, Toast } from 'react-native-system-ui'

export default function SliderRangeLimitDemo() {
  const [value, setValue] = React.useState(10)
  return (
    <Slider
      min={-50}
      max={50}
      value={value}
      onChange={val => setValue(val as number)}
      onChangeAfter={v => Toast.info(`值：${Array.isArray(v) ? v.join(' ~ ') : v}`)}
    />
  )
}
