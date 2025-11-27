import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { createIcon } from '../createIcon'

const WeappNav = createIcon(({ size, primaryColor }, svgProps) => (
  <Svg {...svgProps} width={size} height={size} viewBox="0 0 1024 1024" fill="none">
    <Path
          d="M500 666.667c-92.047 0-166.667-74.62-166.667-166.667S407.953 333.333 500 333.333 666.667 407.953 666.667 500 592.047 666.667 500 666.667zm388.889-55.556c-61.365 0-111.111-49.746-111.111-111.111s49.746-111.111 111.11-111.111C950.255 388.889 1000 438.635 1000 500s-49.746 111.111-111.111 111.111zm-777.778 0C49.746 611.111 0 561.365 0 500s49.746-111.111 111.111-111.111S222.222 438.635 222.222 500s-49.746 111.111-111.11 111.111z"
          fillRule="evenodd"
        />
  </Svg>
))

export default WeappNav
