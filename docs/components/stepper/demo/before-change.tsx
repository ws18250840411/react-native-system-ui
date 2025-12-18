import React from 'react'
import { View } from 'react-native'

import { Stepper, Toast } from 'react-native-system-ui'

export default function StepperBeforeChangeDemo() {
  const [value, setValue] = React.useState(1)

  return (
    <View style={{ gap: 16 }}>
      <Stepper
        value={value}
        onChange={v => setValue(v ?? 0)}
        beforeChange={() => {
          const toast = Toast.loading({
            message: '校验中...',
            forbidClick: true,
            duration: 0,
          })
          return new Promise<boolean>(resolve => {
            setTimeout(() => {
              toast.config({ type: 'success', message: '校验通过', duration: 800 })
              resolve(true)
            }, 500)
          })
        }}
      />
    </View>
  )
}

