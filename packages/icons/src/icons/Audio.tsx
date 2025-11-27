import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { createIcon } from '../createIcon'

const Audio = createIcon(({ size, primaryColor }, svgProps) => (
  <Svg {...svgProps} width={size} height={size} viewBox="0 0 1024 1024" fill="none">
    <Path
          d="M111.111 500c0-214.777 174.112-388.889 388.889-388.889 214.777 0 388.889 174.112 388.889 388.889v277.778c0 30.682-24.873 55.555-55.556 55.555h-55.555c-30.683 0-55.556-24.873-55.556-55.555V555.556c0-30.683 24.873-55.556 55.556-55.556h55.555c0-184.095-149.238-333.333-333.333-333.333-184.095 0-333.333 149.238-333.333 333.333h55.555c30.683 0 55.556 24.873 55.556 55.556v222.222c0 30.682-24.873 55.555-55.556 55.555h-55.555c-30.683 0-55.556-24.873-55.556-55.555V500z"
          fillRule="evenodd"
        />
  </Svg>
))

export default Audio
