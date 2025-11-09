import React from 'react'

import { ConfigProvider, enUS, Button, useLocale } from 'react-native-system-ui'

const LocaleViewer = () => {
  const locale = useLocale()
  return <span>{locale.loading}</span>
}

export default () => (
  <ConfigProvider locale={enUS}>
    <Button text="Submit" type="primary" style={{ marginBottom: 8 }} />
    <LocaleViewer />
  </ConfigProvider>
)
