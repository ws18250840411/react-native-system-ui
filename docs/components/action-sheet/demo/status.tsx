import React from 'react'

import { ActionSheet, Button, Toast } from 'react-native-system-ui'

export default () => {
  const [visible, setVisible] = React.useState(false)

  return (
    <>
      <Button text="选项状态" onPress={() => setVisible(true)} />
      <ActionSheet
        visible={visible}
        actions={[
          { name: '红色选项', color: '#ee0a24' },
          { name: '禁用选项', disabled: true },
          { name: '加载中', loading: true },
        ]}
        onSelect={action => {
          setVisible(false)
          Toast.info(String(action.name ?? ''))
        }}
        onClose={() => setVisible(false)}
      />
    </>
  )
}

