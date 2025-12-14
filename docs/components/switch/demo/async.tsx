import React from 'react'

import { Dialog, Switch } from 'react-native-system-ui'

export default function SwitchAsyncDemo() {
  const [value, setValue] = React.useState(false)

  const onChange = async (checked: any) => {
    try {
      await Dialog.confirm({
        title: '提醒',
        message: '是否切换开关？',
      })
      setValue(checked)
    } catch {
      // 取消 dialog
    }
  }

  return <Switch checked={value} onChange={onChange} />
}
