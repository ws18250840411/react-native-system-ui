import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { createIcon } from '../createIcon'

const Minus = createIcon(({ size, primaryColor }, svgProps) => (
  <Svg {...svgProps} width={size} height={size} viewBox="0 0 1024 1024" fill="none">
    <Path
          d="M537.5 537.5h-400c-20.71 0-37.5-16.79-37.5-37.5s16.79-37.5 37.5-37.5h725c20.71 0 37.5 16.79 37.5 37.5s-16.79 37.5-37.5 37.5h-325z"
          fillRule="nonzero"
        />
  </Svg>
))

export default Minus
