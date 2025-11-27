import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { createIcon } from '../createIcon'

const Ellipsis = createIcon(({ size, primaryColor }, svgProps) => (
  <Svg {...svgProps} width={size} height={size} viewBox="0 0 1024 1024" fill="none">
    <Path
          d="M180.556 416.667c38.353 0 69.444 31.091 69.444 69.444s-31.091 69.445-69.444 69.445c-38.354 0-69.445-31.092-69.445-69.445 0-38.353 31.091-69.444 69.445-69.444zm319.444 0c38.353 0 69.444 31.091 69.444 69.444s-31.09 69.445-69.444 69.445c-38.353 0-69.444-31.092-69.444-69.445 0-38.353 31.09-69.444 69.444-69.444zm319.444 0c38.354 0 69.445 31.091 69.445 69.444s-31.091 69.445-69.445 69.445c-38.353 0-69.444-31.092-69.444-69.445 0-38.353 31.091-69.444 69.444-69.444z"
          fillRule="evenodd"
        />
  </Svg>
))

export default Ellipsis
