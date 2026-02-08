import React, { useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Button, ErrorBoundary } from 'react-native-system-ui'
import type { ErrorBoundaryRef } from 'react-native-system-ui'

let throwCount = 0

const UnstableComponent = () => {
  throwCount += 1
  if (throwCount % 2 === 1) throw new Error(`Crash #${throwCount}`)
  return (
    <View style={styles.card}>
      <Text style={styles.text}>✅ Recovered successfully (attempt #{throwCount})</Text>
    </View>
  )
}

export default function ErrorBoundaryResetDemo() {
  const ref = useRef<ErrorBoundaryRef>(null)

  return (
    <View style={styles.root}>
      <ErrorBoundary
        ref={ref}
        fallback={(error, reset) => (
          <View style={styles.fallback}>
            <Text style={styles.errorTitle}>💥 {error.message}</Text>
            <Button text="Retry" size="small" type="primary" onPress={reset} />
          </View>
        )}
        onError={(error) => {
          // 生产环境可上报错误监控
          console.log('[ErrorBoundary] caught:', error.message)
        }}
        onReset={() => {
          console.log('[ErrorBoundary] reset')
        }}
      >
        <UnstableComponent />
      </ErrorBoundary>
    </View>
  )
}

const styles = StyleSheet.create({
  root: { width: '100%' },
  card: { backgroundColor: '#f0fdf4', borderRadius: 12, padding: 16 },
  text: { fontSize: 14, color: '#166534' },
  fallback: { backgroundColor: '#fffbeb', borderRadius: 12, padding: 16, alignItems: 'center', gap: 12 },
  errorTitle: { fontSize: 14, fontWeight: '600', color: '#92400e' },
})
