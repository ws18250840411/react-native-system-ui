import React from 'react'
import { ActionSheet, Cell, Toast } from 'react-native-system-ui'

const actions = [{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }]
const actionsWithSub = [
  { name: '选项一' },
  { name: '选项二' },
  { name: '选项三', subname: '描述信息' },
]

type SheetType = 'basic' | 'cancel' | 'description' | null

export default function ActionSheetBasicDemo() {
  const [active, setActive] = React.useState<SheetType>(null)
  const close = () => setActive(null)

  return (
    <>
      <Cell title="基础用法" isLink onPress={() => setActive('basic')} />
      <Cell title="展示取消按钮" isLink onPress={() => setActive('cancel')} />
      <Cell title="展示描述信息" isLink onPress={() => setActive('description')} />

      <ActionSheet
        visible={active === 'basic'}
        onCancel={close}
        actions={actions}
        closeOnClickAction
        onSelect={(action) => Toast.info(String(action.name ?? ''))}
      />
      <ActionSheet
        visible={active === 'cancel'}
        onCancel={close}
        actions={actions}
        cancelText="取消"
        closeOnClickAction
        onSelect={(action) => Toast.info(String(action.name ?? ''))}
      />
      <ActionSheet
        visible={active === 'description'}
        onCancel={close}
        description="这是一段描述信息"
        actions={actionsWithSub}
        cancelText="取消"
        closeOnClickAction
        onSelect={(action) => Toast.info(String(action.name ?? ''))}
      />
    </>
  )
}
