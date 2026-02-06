import React from 'react'
import { ActionSheet, Cell, Toast } from 'react-native-system-ui'

export default function ActionSheetDescriptionDemo() {
  const [visible, setVisible] = React.useState(false)
  const onCancel = () => setVisible(false)
  return (
    <>
      <Cell title="展示描述" isLink onPress={() => setVisible(true)} />
      <ActionSheet
        visible={visible}
        onCancel={onCancel}
        title="分享"
        description="描述信息"
        actions={[
          { name: '朋友圈', subname: '最多 9 张' },
          { name: '好友', subname: '单条消息' },
        ]}
        cancelText="取消"
        closeOnClickAction
        onSelect={(action) => {
          Toast.info(String(action.name ?? ''))
        }}
      />
    </>
  )
}
