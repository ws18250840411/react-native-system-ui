import React from 'react'
import { Button, ActionSheet } from 'react-native-system-ui'

export default () => {
  const [visible, setVisible] = React.useState(false)
  return (
    <>
      <Button text="展示面板" onPress={() => setVisible(true)} />
      <ActionSheet
        visible={visible}
        title="操作"
        actions={[{ name: '编辑' }, { name: '删除', color: '#fa5151' }]}
        cancelText="取消"
        onClose={() => setVisible(false)}
      />
    </>
  )
}
