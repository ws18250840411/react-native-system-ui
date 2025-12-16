import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Button, ConfigProvider, Rate, Slider, Space } from 'react-native-system-ui'

const theme = {
  components: {
    button: {
      toneMap: {
        primary: {
          background: '#8a46ff',
          border: '#8a46ff',
          text: '#ffffff',
        },
      },
    },
    slider: {
      track: {
        height: 4,
      },
      colors: {
        active: '#8a46ff',
        inactive: '#e5e8f0',
      },
      thumb: {
        size: 22,
      },
    },
    rate: {
      colors: {
        active: '#ffcc56',
        inactive: '#f2dcb0',
        disabled: '#d8dce7',
      },
    },
  },
}

export default () => {
  const [score, setScore] = React.useState(4)
  const [progress, setProgress] = React.useState(60)

  const handleSliderChange = (value: number | [number, number]) => {
    setProgress(Array.isArray(value) ? value[0] : value)
  }

  return (
    <ConfigProvider theme={theme}>
      <Space direction="vertical" gap={16}>
        <View style={styles.card}>
          <Text style={styles.title}>定制主题</Text>

          <View style={styles.row}>
            <Text style={styles.label}>评分</Text>
            <Rate value={score} onChange={setScore} />
          </View>

          <View style={[styles.row, styles.rowLast]}>
            <Text style={styles.label}>滑块</Text>
            <View style={styles.sliderControl}>
              <Slider value={progress} onChange={handleSliderChange} style={{ flex: 1 }} />
              <Text style={styles.value}>{progress}</Text>
            </View>
          </View>
        </View>

        <Button text="提交" type="primary" block round />
      </Space>
    </ConfigProvider>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 20,
  },
  title: {
    marginBottom: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#1d1f2c',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#f0f2f6',
  },
  rowLast: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  label: {
    fontSize: 13,
    color: '#4a5465',
    minWidth: 48,
    marginRight: 16,
  },
  sliderControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  value: {
    fontSize: 12,
    color: '#475467',
    minWidth: 28,
    textAlign: 'right',
  },
})
