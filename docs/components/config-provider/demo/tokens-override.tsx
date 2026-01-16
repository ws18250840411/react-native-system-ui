import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Button, Space, Swiper, SwiperItem } from 'react-native-system-ui'

export default () => {
  return (
    <View style={styles.root}>
      <View style={styles.panel}>
        <Text style={styles.title}>实例级 tokensOverride</Text>

        <Space direction="vertical" gap={16}>
          <Button
            type="primary"
            text="自定义 Ripple"
            tokensOverride={{
              colors: {
                ripple: 'rgba(255,255,255,0.25)',
              },
            }}
          />

          <Space
            size="normal"
            tokensOverride={{
              sizing: {
                presets: {
                  normal: 24,
                },
              }
            }}
          >
            <Button text="Item A" />
            <Button text="Item B" />
          </Space>

          <View style={styles.swiperBox}>
            <Swiper
              autoplay
              loop
              indicator
              style={styles.swiper}
              indicatorProps={{
                tokensOverride: {
                  colors: {
                    active: '#ffffff',
                    inactive: 'rgba(255,255,255,0.35)',
                  },
                },
              }}
            >
              <SwiperItem>
                <View style={[styles.swiperItem, { backgroundColor: '#8a46ff' }]} />
              </SwiperItem>
              <SwiperItem>
                <View style={[styles.swiperItem, { backgroundColor: '#16a34a' }]} />
              </SwiperItem>
              <SwiperItem>
                <View style={[styles.swiperItem, { backgroundColor: '#2563eb' }]} />
              </SwiperItem>
            </Swiper>
          </View>
        </Space>
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
  swiperBox: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  swiper: {
    height: 120,
    width: '100%',
  },
  swiperItem: {
    flex: 1,
  },
})
