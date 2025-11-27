import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { createIcon } from '../createIcon'

const ArrowUp = createIcon(({ size, primaryColor }, svgProps) => (
  <Svg {...svgProps} width={size} height={size} viewBox="0 0 1024 1024" fill="none">
    <Path
          d="M513.176 285.05a41.472 41.472 0 0120.024 11.127L867.11 630.089c16.272 16.271 16.272 42.653 0 58.925s-42.654 16.272-58.925 0L503.612 384.44 199.085 688.967c-16.272 16.271-42.654 16.271-58.925 0-16.272-16.272-16.272-42.654 0-58.926L474.07 296.129c10.606-10.606 25.508-14.299 39.105-11.078z"
          fillRule="evenodd"
        />
  </Svg>
))

export default ArrowUp
