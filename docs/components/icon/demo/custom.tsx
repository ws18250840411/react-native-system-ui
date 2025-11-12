import React from 'react'
import { Svg, Circle } from 'react-native-svg'

import { Icon, Typography } from 'react-native-system-ui'

const Ring = ({ size = 24, color = '#3b82f6' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={2} fill="none" />
  </Svg>
)

export default () => (
  <>
    <Typography.Text>
      可以通过 `component` 或 `children` 传入任意 `react-native-svg` 图形，例如：
    </Typography.Text>
    <Icon component={Ring} size={32} color="#ef4444" />
  </>
)
