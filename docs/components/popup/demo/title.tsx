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
        <Cell title="标题弹框" isLink onPress={() => setVisible(true)} />
        <Popup
          visible={visible}
          closeable
          title="标题"
          description="这是一段很长很长的描述这是一段很长很长的描述这是一段很长很长的描述这是一段很长很长的描述"
          style={{ height: '30%' }}
          placement="bottom"
          round
          onClose={() => setVisible(false)}
        />
      </Cell.Group>
    </Host>
  )
}

