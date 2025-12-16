import React from 'react'
import { Stepper } from 'react-native-system-ui'
import { View } from 'react-native'

export default function StepperCustomDemo() {
  const [price, setPrice] = React.useState(2.5)
  const onPriceChange = (v: number | null) => setPrice(v ?? 0)
  return (
    <View style={{ gap: 12 }}>
      <Stepper
        value={price}
        step={0.25}
        decimalLength={2}
        min={0}
        max={10}
        onChange={onPriceChange}
      />
      <Stepper theme="round" defaultValue={3} buttonSize={28} inputWidth={40} />
    </View>
  )
}
