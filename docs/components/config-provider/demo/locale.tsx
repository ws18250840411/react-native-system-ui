import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Button, ConfigProvider, Space, enUS, useLocale, zhCN } from 'react-native-system-ui'

const LocaleViewer = () => {
  const locale = useLocale()
  return (
    <View style={styles.localePreview}>
      <View style={styles.localeRow}>
        <Text style={styles.localeLabel}>Loading</Text>
        <Text style={styles.localeValue}>{locale.loading}</Text>
      </View>
      <View style={styles.localeRow}>
        <Text style={styles.localeLabel}>Confirm</Text>
        <Text style={styles.localeValue}>{locale.confirm}</Text>
      </View>
      <View style={styles.localeRow}>
        <Text style={styles.localeLabel}>Cancel</Text>
        <Text style={styles.localeValue}>{locale.cancel}</Text>
      </View>
    </View>
  )
}

export default function ConfigProviderLocaleDemo() {
  const [language, setLanguage] = React.useState<'zh' | 'en'>('en')
  const locale = language === 'en' ? enUS : zhCN

  return (
    <View style={styles.root}>
      <View style={styles.panel}>
        <Text style={styles.title}>语言切换</Text>
        <Space wrap gap={8} style={styles.actions}>
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
        </Space>
        <ConfigProvider locale={locale}>
          <LocaleViewer />
        </ConfigProvider>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  panel: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
  },
  title: {
    marginBottom: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#1d1f2c',
  },
  actions: {
    marginBottom: 12,
    width: '100%',
  },
  localePreview: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f4f7ff',
  },
  localeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  localeLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475467',
    marginRight: 6,
    minWidth: 56,
  },
  localeValue: {
    fontSize: 13,
    color: '#101828',
    flexShrink: 1,
  },
})
