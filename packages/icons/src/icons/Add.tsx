import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { createIcon } from '../createIcon'

const Add = createIcon(({ size, primaryColor }, svgProps) => (
  <Svg {...svgProps} width={size} height={size} viewBox="0 0 1024 1024" fill="none">
    <Path
          d="M694.667 527.778h-166.89v166.889c0 15.277-12.444 27.777-27.777 27.777s-27.778-12.5-27.778-27.777v-166.89H305.333c-15.277 0-27.777-12.444-27.777-27.777s12.5-27.778 27.777-27.778h166.89V305.333c0-15.277 12.444-27.777 27.777-27.777s27.778 12.5 27.778 27.777v166.89h166.889c15.277 0 27.777 12.444 27.777 27.777s-12.5 27.778-27.777 27.778M500 55.556c-245.444 0-444.444 199-444.444 444.444 0 245.444 199 444.444 444.444 444.444 245.444 0 444.444-199 444.444-444.444 0-245.444-199-444.444-444.444-444.444"
          fillRule="evenodd"
        />
  </Svg>
))

export default Add
