import React, { useState, useMemo } from 'react'
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import { PullRefresh, Tabs, Toast } from 'react-native-system-ui'

export default () => {
  const { height: windowHeight } = useWindowDimensions()
  const [count, setCount] = useState<number>(0)
  const tips = useMemo(() => {
    if (count) {
      return `刷新次数: ${count}`
    }
    return '下拉试试'
  }, [count])

  const onRefresh = (showToast: boolean) => {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        if (showToast) {
          Toast.info('刷新成功')
        }
        setCount(count + 1)
        resolve()
      }, 1000)
    })
  }

  const pullRefreshHeight = windowHeight - 50

  return (
    <Tabs>
      <Tabs.TabPane title="基础用法" name="basic">
        <PullRefresh
          key="basic"
          style={[styles.pullRefresh, { height: pullRefreshHeight }]}
          successText={null}
          onRefresh={() => onRefresh(true)}
          onRefreshEnd={() => console.log('onRefreshEnd')}
        >
          <View style={styles.content}>
            <Text>{tips}</Text>
          </View>
        </PullRefresh>
      </Tabs.TabPane>
      <Tabs.TabPane title="成功提示" name="success">
        <PullRefresh
          key="success"
          style={[styles.pullRefresh, { height: pullRefreshHeight }]}
          successText="刷新成功"
          onRefresh={() => onRefresh(false)}
        >
          <View style={styles.content}>
            <Text>{tips}</Text>
          </View>
        </PullRefresh>
      </Tabs.TabPane>
      <Tabs.TabPane title="自定义内容" name="custom">
        <PullRefresh
          key="custom"
          style={[styles.pullRefresh, { height: pullRefreshHeight }]}
          successText={null}
          headHeight={80}
          pullingText={({ distance }: { distance: number }) => (
            <View
              style={[
                styles.customIndicator,
                {
                  transform: [{ scale: distance / 80 }],
                },
              ]}
            >
              <Text style={styles.customText}>下拉中...</Text>
            </View>
          )}
          loosingText={() => (
            <View style={styles.customIndicator}>
              <Text style={styles.customText}>释放刷新</Text>
            </View>
          )}
          loadingText={() => (
            <View style={[styles.customIndicator, styles.customIndicatorLoading]}>
              <Text style={[styles.customText, styles.customTextLoading]}>加载中...</Text>
            </View>
          )}
          onRefresh={() => onRefresh(true)}
        >
          <View style={styles.content}>
            <Text>{tips}</Text>
          </View>
        </PullRefresh>
      </Tabs.TabPane>
    </Tabs>
  )
}

const styles = StyleSheet.create({
  pullRefresh: {
    backgroundColor: '#fff',
  },
  content: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 0,
    paddingBottom: 96,
  },
  customIndicator: {
    width: 140,
    height: 72,
    marginTop: 8,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customIndicatorLoading: {
    backgroundColor: '#e6f7ff',
  },
  customText: {
    fontSize: 12,
    color: '#666',
  },
  customTextLoading: {
    color: '#1890ff',
  },
})
