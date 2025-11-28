import React from 'react'
import { Stepper } from 'react-native-system-ui'
import { View, Text } from 'react-native'

export default function StepperCustomDemo() {
  const [price, setPrice] = React.useState(2.5)
  return (
    <View style={{ gap: 12 }}>
      <Text>保留两位小数</Text>
      <Stepper
        value={price}
        step={0.25}
        decimalLength={2}
        min={0}
        max={10}
        onChange={setPrice}
      />
      <Text>小号 + 圆角主题</Text>
      <Stepper size="small" theme="round" defaultValue={3} />
    </View>
  )
}
