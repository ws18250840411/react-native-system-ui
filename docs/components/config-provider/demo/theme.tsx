import React from 'react'

import { ConfigProvider, Button } from 'react-native-system-ui'

const theme = {
  components: {
    button: {
      toneMap: {
        primary: {
          background: '#111f8f',
          border: '#111f8f',
          text: '#ffe8a3',
        },
      },
    },
  },
}

export default () => (
  <ConfigProvider theme={theme}>
    <Button text="品牌按钮" type="primary" shadow />
  </ConfigProvider>
)
