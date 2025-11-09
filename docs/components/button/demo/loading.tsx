import React from 'react'

import { Button } from 'react-native-system-ui'

export default () => (
  <>
    <Button text="加载中" type="primary" loading style={{ marginBottom: 8 }} />
    <Button text="提交" type="primary" loading loadingText="提交中" />
  </>
)
