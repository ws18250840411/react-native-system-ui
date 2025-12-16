import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Space } from 'react-native-system-ui'

const Card = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.card}>
    {typeof children === 'string' || typeof children === 'number' ? (
      <Text style={styles.cardText}>{children}</Text>
    ) : (
      children
    )}
  </View>
)

export default () => (
  <Space direction="vertical" gap={16}>
    <Space justify="center" block>
      <Card>1</Card>
      <Card>
        <Text style={styles.cardText}>
          2{'\n'}2
        </Text>
      </Card>
      <Card>
        <Text style={styles.cardText}>
          3{'\n'}3{'\n'}3
        </Text>
      </Card>
    </Space>
    <Space align="end">
      <Card>1</Card>
      <Card>
        <Text style={styles.cardText}>
          2{'\n'}2
        </Text>
      </Card>
      <Card>
        <Text style={styles.cardText}>
          3{'\n'}3{'\n'}3
        </Text>
      </Card>
    </Space>
  </Space>
)

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#e5e7eb',
    borderRadius: 6,
    backgroundColor: '#ffffff',
  },
  cardText: {
    color: '#111827',
    lineHeight: 18,
  },
})
