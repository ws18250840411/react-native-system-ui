import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Image, Space } from 'react-native-system-ui'
import type { ImageFit } from 'react-native-system-ui'

const fits: ImageFit[] = ['contain', 'cover', 'fill', 'none', 'scale-down']

export default () => (
  <Space wrap gap={12}>
    {fits.map(fit => (
      <View style={styles.item} key={fit}>
        <Image width={96} height={64} fit={fit} src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg" radius={12} />
        <Text style={styles.label}>{fit}</Text>
      </View>
    ))}
  </Space>
)

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
  },
  label: {
    marginTop: 6,
    fontSize: 12,
    color: '#667085',
  },
})
