import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { createIcon } from '../createIcon'

const Circle = createIcon(({ size, primaryColor }, svgProps) => (
  <Svg {...svgProps} width={size} height={size} viewBox="0 0 1024 1024" fill="none">
    <Path
          d="M500 881.944c210.942 0 381.944-171.002 381.944-381.944S710.942 118.056 500 118.056 118.056 289.058 118.056 500 289.058 881.944 500 881.944zm0 62.5C254.54 944.444 55.556 745.46 55.556 500S254.54 55.556 500 55.556 944.444 254.54 944.444 500 745.46 944.444 500 944.444z"
          fillRule="nonzero"
        />
  </Svg>
))

export default Circle
