import React from 'react'
import { View } from 'react-native'

import { Icon, Typography } from 'react-native-system-ui'

const Dot = ({ size = 24, color = '#3b82f6' }: { size?: number; color?: string }) => (
  <View
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      borderWidth: 2,
      borderColor: color,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <View style={{ width: size / 3, height: size / 3, backgroundColor: color, borderRadius: size / 6 }} />
  </View>
)

export default () => (
  <>
    <Typography.Text>
      可以通过 `component` 传入自定义图形（任意 React 元素），例如：
    </Typography.Text>
    <Icon component={Dot} size={32} color="#ef4444" />
  </>
)
