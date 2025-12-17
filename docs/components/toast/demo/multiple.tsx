import React from 'react'

import { Cell, Switch, Toast } from 'react-native-system-ui'

export default function ToastMultipleDemo() {
  const firstRef = React.useRef<ReturnType<typeof Toast.show> | null>(null)
  const secondRef = React.useRef<ReturnType<typeof Toast.show> | null>(null)
  const [multiple, setMultiple] = React.useState(false)

  React.useEffect(() => {
    Toast.allowMultiple(multiple)
  }, [multiple])

  React.useEffect(() => {
    return () => {
      Toast.allowMultiple(false)
      Toast.clear()
    }
  }, [])

  const showFirst = () => {
    firstRef.current = Toast.show({
      message: '第一个 Toast',
      duration: 0,
    })
  }

  const showSecond = () => {
    secondRef.current = Toast.show({
      message: '第二个 Toast',
      duration: 0,
    })
  }

  return (
    <>
      <Cell title="允许多个 Toast" value={<Switch value={multiple} onValueChange={setMultiple} />} />
      <Cell title="显示第一个 Toast" isLink onPress={showFirst} />
      <Cell title="显示第二个 Toast" isLink onPress={showSecond} />
      <Cell title="清除第一个" isLink onPress={() => firstRef.current?.clear()} />
      <Cell title="清除第二个" isLink onPress={() => secondRef.current?.clear()} />
    </>
  )
}
