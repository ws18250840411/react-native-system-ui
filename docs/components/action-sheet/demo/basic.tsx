import React from 'react'
import { ActionSheet, Cell, Toast } from 'react-native-system-ui'

const actions = [{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }]
const actions1 = [
  { name: '选项一' },
  { name: '选项二' },
  { name: '选项三', subname: '描述信息' },
]

export default () => {
  const [visible, setVisible] = React.useState(-1)
  const onCancel = () => setVisible(-1)
  return (
    <>
      <Cell title="基础用法" isLink onPress={() => setVisible(1)} />
      <Cell title="展示取消按钮" isLink onPress={() => setVisible(2)} />
      <Cell title="展示描述信息" isLink onPress={() => setVisible(3)} />

      <ActionSheet
        visible={visible === 1}
        onCancel={onCancel}
        actions={actions}
        closeOnClickAction
        onSelect={(action) => {
          Toast.info(String(action.name ?? ''))
        }}
      />
      <ActionSheet
        visible={visible === 2}
        onCancel={onCancel}
        actions={actions}
        cancelText="取消"
        closeOnClickAction
        onSelect={(action) => {
          Toast.info(String(action.name ?? ''))
        }}
      />
      <ActionSheet
        visible={visible === 3}
        onCancel={onCancel}
        description="这是一段描述信息"
        actions={actions1}
        cancelText="取消"
        closeOnClickAction
        onSelect={(action) => {
          Toast.info(String(action.name ?? ''))
        }}
      />
    </>
  )
}
