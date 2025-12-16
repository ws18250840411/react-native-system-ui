import React from 'react'
import { Checkbox, Toast } from 'react-native-system-ui'

export default function CheckboxAsyncDemo() {
  const [checked, setChecked] = React.useState(false)

  return (
    <Checkbox
      checked={checked}
      onChange={val => {
        Toast.loading({ forbidClick: true, duration: 0 })

        setTimeout(() => {
          Toast.clear()
          setChecked(val)
        }, 500)
      }}
    >
      复选框
    </Checkbox>
  )
}
