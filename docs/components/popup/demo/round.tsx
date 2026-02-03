import React from 'react'

import { Platform } from 'react-native'

import { Cell, Popup, Portal } from 'react-native-system-ui'

const Host: React.FC<{ children: React.ReactNode }> = ({ children }) =>
  Platform.OS === 'web' ? <Portal.Host fixed>{children}</Portal.Host> : <>{children}</>

export default () => {
  const [visible, setVisible] = React.useState(false)

  return (
    <Host>
      <Cell.Group>
        <Cell title="圆角弹窗" isLink onPress={() => setVisible(true)} />
        <Popup
          visible={visible}
          placement="bottom"
          closeable
          round
          onClose={() => setVisible(false)}
          style={{ height: '30%' }}
        />
      </Cell.Group>
    </Host>
  )
}
