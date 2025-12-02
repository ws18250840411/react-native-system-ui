import React from 'react'

import { ConfigProvider, zhCN, enUS, Button, useLocale } from 'react-native-system-ui'
import './style.css'

const LocaleViewer = () => {
  const locale = useLocale()
  return (
    <div className="demo-config-provider__locale-preview">
      <p>
        <strong>Loading</strong>
        {locale.loading}
      </p>
      <p>
        <strong>Confirm</strong>
        {locale.confirm}
      </p>
      <p>
        <strong>Cancel</strong>
        {locale.cancel}
      </p>
    </div>
  )
}

export default () => {
  const [language, setLanguage] = React.useState<'zh' | 'en'>('en')
  const locale = language === 'en' ? enUS : zhCN

  return (
    <div className="demo-config-provider">
      <section className="demo-config-provider__panel">
        <p className="demo-config-provider__title">语言切换</p>
        <div className="demo-config-provider__actions">
          <Button
            text="中文"
            size="small"
            type={language === 'zh' ? 'primary' : 'default'}
            onPress={() => setLanguage('zh')}
          />
          <Button
            text="English"
            size="small"
            type={language === 'en' ? 'primary' : 'default'}
            onPress={() => setLanguage('en')}
          />
        </div>
        <ConfigProvider locale={locale}>
          <LocaleViewer />
        </ConfigProvider>
      </section>
    </div>
  )
}
