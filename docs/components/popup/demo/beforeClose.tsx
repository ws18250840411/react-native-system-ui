import React from 'react'

import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

import { Cell, Popup, Space } from 'react-native-system-ui'

export default function PopupBeforeCloseDemo() {
  const [visible, setVisible] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const beforeClose = async (reason: 'close-icon' | 'overlay' | 'close') => {
    if (loading) return false
    setLoading(true)
    return new Promise<boolean>(resolve => {
      setTimeout(() => resolve(true), 800)
    })
  }

  return (
    <Cell.Group>
      <Cell title="异步关闭" isLink onPress={() => setVisible(true)} />
      <Popup
        visible={visible}
        placement="center"
        closeable
        beforeClose={beforeClose}
        onClose={() => setVisible(false)}
        onClosed={() => setLoading(false)}
        round
        style={styles.popup}
      >
        <View style={styles.dialog}>
          <Space direction="vertical" gap={12} align="center" block={false}>
            <Text style={styles.title}>异步关闭</Text>
            <Text style={styles.tip}>点击遮罩或关闭图标关闭（将等待 800ms）</Text>
            {loading ? (
              <View style={styles.loadingRow}>
                <ActivityIndicator size="small" color="#64748b" />
                <Text style={styles.loading}>关闭中...</Text>
              </View>
            ) : null}
          </Space>
        </View>
      </Popup>
    </Cell.Group>
  )
}

const styles = StyleSheet.create({
  popup: {
    padding: 0,
  },
  dialog: {
    width: 280,
    paddingHorizontal: 24,
    paddingVertical: 22,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    textAlign: 'center',
  },
  tip: {
    fontSize: 14,
    color: '#334155',
    textAlign: 'center',
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  loading: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 8,
  },
})
