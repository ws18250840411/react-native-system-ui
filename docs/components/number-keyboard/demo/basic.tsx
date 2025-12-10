import React from 'react'
import { View } from 'react-native'
import { Cell, NumberKeyboard, Toast } from 'react-native-system-ui'

type DemoKey = 'v1' | 'v2' | 'v3' | 'v4' | 'v5' | 'v6' | null

export default function NumberKeyboardBasicDemo() {
  const [active, setActive] = React.useState<DemoKey>(null)

  const open = (key: Exclude<DemoKey, null>) => setActive(key)
  const close = () => setActive(null)

  const onInput = (val: string) => Toast.info({ message: `输入 ${val}`, duration: 800 })
  const onDelete = () => Toast.info({ message: '删除', duration: 800 })

  return (
    <View style={{ gap: 12 }}>
      <Cell.Group>
        <Cell title="弹出默认键盘" isLink onPress={() => open('v1')} />
        <Cell title="弹出带右侧栏的键盘" isLink onPress={() => open('v2')} />
        <Cell title="弹出身份证号键盘" isLink onPress={() => open('v3')} />
        <Cell title="弹出带标题的键盘" isLink onPress={() => open('v4')} />
        <Cell title="弹出配置多个按键的键盘" isLink onPress={() => open('v5')} />
        <Cell title="弹出配置随机数字的键盘" isLink onPress={() => open('v6')} />
      </Cell.Group>

      {/* 弹出默认键盘 */}
      <NumberKeyboard
        visible={active === 'v1'}
        onBlur={close}
        onInput={onInput}
        onDelete={onDelete}
      />
      {/* 弹出带右侧栏的键盘 */}
      <NumberKeyboard
        theme="custom"
        extraKey="."
        closeButtonText="完成"
        visible={active === 'v2'}
        onBlur={close}
        onInput={onInput}
        onDelete={onDelete}
      />
      {/* 弹出身份证号键盘 */}
      <NumberKeyboard
        extraKey="X"
        closeButtonText="完成"
        visible={active === 'v3'}
        onBlur={close}
        onInput={onInput}
        onDelete={onDelete}
      />
      {/* 弹出带标题的键盘 */}
      <NumberKeyboard
        title="键盘标题"
        extraKey="."
        closeButtonText="完成"
        visible={active === 'v4'}
        onBlur={close}
        onInput={onInput}
        onDelete={onDelete}
      />
      {/* 弹出配置多个按键的键盘 */}
      <NumberKeyboard
        theme="custom"
        extraKey={['00', '.']}
        closeButtonText="完成"
        visible={active === 'v5'}
        onBlur={close}
        onInput={onInput}
        onDelete={onDelete}
      />
      {/* 弹出配置随机数字的键盘 */}
      <NumberKeyboard
        randomKeyOrder
        visible={active === 'v6'}
        onBlur={close}
        onInput={onInput}
        onDelete={onDelete}
      />
    </View>
  )
}
