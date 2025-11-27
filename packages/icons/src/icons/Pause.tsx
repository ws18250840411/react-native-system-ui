import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { createIcon } from '../createIcon'

const Pause = createIcon(({ size, primaryColor }, svgProps) => (
  <Svg {...svgProps} width={size} height={size} viewBox="0 0 1024 1024" fill="none">
    <Path
          d="M333.333 138.889c46.024 0 83.334 37.31 83.334 83.333v555.556c0 46.024-37.31 83.333-83.334 83.333-46.023 0-83.333-37.31-83.333-83.333V222.222c0-46.024 37.31-83.333 83.333-83.333zm333.334 0c46.023 0 83.333 37.31 83.333 83.333v555.556c0 46.024-37.31 83.333-83.333 83.333-46.024 0-83.334-37.31-83.334-83.333V222.222c0-46.024 37.31-83.333 83.334-83.333z"
          fillRule="evenodd"
        />
  </Svg>
))

export default Pause
