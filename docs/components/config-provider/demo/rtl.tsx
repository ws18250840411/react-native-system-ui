import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Button, Cell, CellGroup, ConfigProvider, NavBar, Space, Tag } from 'react-native-system-ui'

export default function ConfigProviderRTLDemo() {
  const [dir, setDir] = React.useState<'ltr' | 'rtl'>('ltr')

  return (
    <View style={styles.root}>
      <View style={styles.panel}>
        <Text style={styles.title}>布局方向切换</Text>
        <Space wrap gap={8} style={styles.actions}>
          <Button
            text="LTR (左到右)"
            size="small"
            type={dir === 'ltr' ? 'primary' : 'default'}
            onPress={() => setDir('ltr')}
          />
          <Button
            text="RTL (右到左)"
            size="small"
            type={dir === 'rtl' ? 'primary' : 'default'}
            onPress={() => setDir('rtl')}
          />
        </Space>
        <ConfigProvider direction={dir}>
          <NavBar
            title="页面标题"
            leftArrow
            leftText="返回"
            rightText="编辑"
          />
          <View style={{ height: 8 }} />
          <CellGroup>
            <Cell title="用户名" value="John" isLink />
            <Cell
              title="状态"
              value={
                <Tag type="success" plain>Active</Tag>
              }
              isLink
            />
          </CellGroup>
        </ConfigProvider>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: { width: '100%' },
  panel: { backgroundColor: '#ffffff', borderRadius: 16, padding: 16 },
  title: { marginBottom: 12, fontSize: 14, fontWeight: '600', color: '#1d1f2c' },
  actions: { marginBottom: 12, width: '100%' },
})
