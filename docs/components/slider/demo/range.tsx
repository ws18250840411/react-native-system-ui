import React from 'react'
import { Slider, Toast } from 'react-native-system-ui'

export default function SliderRangeDemo() {
  const [value, setValue] = React.useState<[number, number]>([10, 50])
  return (
    <Slider
      range
      value={value}
      onChange={setValue}
      onChangeAfter={v => Toast.info(`值：${Array.isArray(v) ? v.join(' ~ ') : v}`)}
    />
  )
}
