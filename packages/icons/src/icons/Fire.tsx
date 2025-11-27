import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { createIcon } from '../createIcon'

const Fire = createIcon(({ size, primaryColor }, svgProps) => (
  <Svg {...svgProps} width={size} height={size} viewBox="0 0 1024 1024" fill="none">
    <Path
          d="M444.444 55.556s296.718 92.243 231.061 377.358c0 0 32.828-25.157 65.657-75.472 0 0 147.727 117.4 147.727 285.116 0 117.4-98.485 218.029-295.455 301.886h-23.921c65.656-95.038 68.392-173.305 8.207-234.8C446.407 583.857 503.856 500 503.856 500S364.859 567.46 337.85 693.14c-14.5 67.468 3.273 151.712 92.142 251.304h-13.325C250 888.89 111.11 778.826 111.11 611.111c0-313.405 310.68-261.07 333.333-555.555z"
          fillRule="nonzero"
        />
  </Svg>
))

export default Fire
