import React from 'react'
import Svg from 'react-native-svg'
import { createIcon } from '../createIcon'

const Empty = createIcon(({ size, primaryColor }, svgProps) => (
  <Svg {...svgProps} width={size} height={size} viewBox="0 0 1024 1024" fill="none">

  </Svg>
))

export default Empty
