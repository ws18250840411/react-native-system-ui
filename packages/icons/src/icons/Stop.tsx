import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { createIcon } from '../createIcon'

const Stop = createIcon(({ size, primaryColor }, svgProps) => (
  <Svg {...svgProps} width={size} height={size} viewBox="0 0 1024 1024" fill="none">
    <Path
          d="M340 300h320c22.091 0 40 17.909 40 40v320c0 22.091-17.909 40-40 40H340c-22.091 0-40-17.909-40-40V340c0-22.091 17.909-40 40-40z"
          fillRule="evenodd"
        />
  </Svg>
))

export default Stop
