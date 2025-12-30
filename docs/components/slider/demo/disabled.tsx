import React from 'react'
import { Slider, Toast } from 'react-native-system-ui'

export default function SliderDisabledDemo() {
  const [value, setValue] = React.useState(10)
  return (
    <Slider
      disabled
      value={value}
      onChange={val => setValue(val as number)}
      onChangeAfter={v => Toast.info(`值：${Array.isArray(v) ? v.join(' ~ ') : v}`)}
    />
  )
}
