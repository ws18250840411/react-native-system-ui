import React from 'react'
import { Radio } from 'react-native-system-ui'

export default () => {
  const [checked, setChecked] = React.useState(false)

  return (
    <Radio checked={checked} onChange={setChecked}>
      单选项
    </Radio>
  )
}
