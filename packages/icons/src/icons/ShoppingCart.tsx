import React from 'react'
import Svg, { Circle, G, Path } from 'react-native-svg'
import { createIcon } from '../createIcon'

const ShoppingCart = createIcon(({ size, primaryColor }, svgProps) => (
  <Svg {...svgProps} width={size} height={size} viewBox="0 0 1024 1024" fill="none">
    <G transform="translate(0 55.556)" fillRule="evenodd">
          <Path d="M132.939 55.364c42.68 0 78.461 32.247 82.885 74.697l3.813 36.605h723.472a1 1 0 01.959 1.282L830.422 554.905a1 1 0 01-.866.714l-563.885 52.84 3.5 33.586c1.475 14.15 13.402 24.899 27.629 24.899h534.848c15.341 0 27.778 12.436 27.778 27.777 0 15.342-12.437 27.778-27.778 27.778H296.8c-42.68 0-78.462-32.246-82.885-74.697L160.567 135.82c-1.474-14.15-13.401-24.899-27.628-24.899H55.556c-15.342 0-27.778-12.437-27.778-27.778s12.436-27.778 27.778-27.778h77.383z" />
          <Circle cx={333.333} cy={833.333} r={55.556} />
          <Circle cx={722.222} cy={833.333} r={55.556} />
        </G>
  </Svg>
))

export default ShoppingCart
