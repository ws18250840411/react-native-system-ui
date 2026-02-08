import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Button, ErrorBoundary } from 'react-native-system-ui'

const BuggyComponent = () => {
  const [shouldThrow, setShouldThrow] = useState(false)
  if (shouldThrow) throw new Error('Oops! Something went wrong.')
  return (
    <View style={styles.card}>
      <Text style={styles.text}>✅ Component is working fine</Text>
      <Button text="Trigger Error" size="small" type="danger" onPress={() => setShouldThrow(true)} />
    </View>
  )
}

export default function ErrorBoundaryBasicDemo() {
  return (
    <View style={styles.root}>
      <ErrorBoundary
        fallback={(error) => (
          <View style={styles.fallback}>
            <Text style={styles.errorIcon}>⚠️</Text>
            <Text style={styles.errorTitle}>Something went wrong</Text>
            <Text style={styles.errorMessage}>{error.message}</Text>
          </View>
        )}
      >
        <BuggyComponent />
      </ErrorBoundary>
    </View>
  )
}

const styles = StyleSheet.create({
  root: { width: '100%' },
  card: { backgroundColor: '#f0fdf4', borderRadius: 12, padding: 16, gap: 12 },
  text: { fontSize: 14, color: '#166534' },
  fallback: { backgroundColor: '#fef2f2', borderRadius: 12, padding: 16, alignItems: 'center', gap: 8 },
  errorIcon: { fontSize: 32 },
  errorTitle: { fontSize: 16, fontWeight: '600', color: '#991b1b' },
  errorMessage: { fontSize: 13, color: '#dc2626' },
})
