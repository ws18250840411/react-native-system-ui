import React from 'react'
import { Button, ActionSheet, Toast } from 'react-native-system-ui'

export default () => {
  const [visible, setVisible] = React.useState(false)
  return (
    <>
      <Button text="展示面板" onPress={() => setVisible(true)} />
      <ActionSheet
        visible={visible}
        actions={[{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }]}
        onSelect={action => {
          setVisible(false)
          Toast.info(String(action.name ?? ''))
        }}
        onClose={() => setVisible(false)}
      />
    </>
  )
}
