import React from 'react'
import { ActionSheet, Cell, Toast } from 'react-native-system-ui'

const actions2 = [
  { name: '选项一', color: '#ee0a24' },
  { name: '选项二', disabled: true },
  { loading: true },
]

export default function ActionSheetStatusDemo() {
  const [visible, setVisible] = React.useState(false)
  const onCancel = () => setVisible(false)
  return (
    <>
      <Cell title="选项状态" isLink onPress={() => setVisible(true)} />
      <ActionSheet
        visible={visible}
        onCancel={onCancel}
        actions={actions2}
        cancelText="取消"
        closeOnClickAction
        onSelect={(action) => {
          if (action.name) {
            Toast.info(String(action.name))
          }
        }}
      />
    </>
  )
}

