import React from 'react'
import { View } from 'react-native'
import { Slider, Toast } from 'react-native-system-ui'

export default function SliderVerticalDemo() {
  const [value1, setValue1] = React.useState(50)
  const [value2, setValue2] = React.useState<[number, number]>([20, 50])

  const onChangeAfter = (v: number | [number, number]) => {
    Toast.info(`值：${Array.isArray(v) ? v.join(' ~ ') : v}`)
  }

  return (
    <View style={{ height: 150, paddingLeft: 30, flexDirection: 'row' }}>
      <Slider
        vertical
        style={{ marginRight: 40, height: 150 }}
        value={value1}
        onChange={setValue1}
        onChangeAfter={onChangeAfter}
      />
      <Slider
        range
        vertical
        style={{ height: 150 }}
        value={value2}
        onChange={setValue2}
        onChangeAfter={onChangeAfter}
      />
    </View>
  )
}
