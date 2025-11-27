import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { createIcon } from '../createIcon'

const Share = createIcon(({ size, primaryColor }, svgProps) => (
  <Svg {...svgProps} width={size} height={size} viewBox="0 0 1024 1024" fill="none">
    <Path
          d="M577.281 140.477c0-22.634 13.21-28.354 29.815-12.47L931.54 438.626c16.461 15.782 16.585 41.317.309 57.037L606.787 809.407c-16.296 15.72-29.506 9.917-29.506-12.552V632.761C101.541 632.76 56 881.36 56 881.36s-7.34-501.954 521.281-576.77V140.478z"
          fillRule="nonzero"
        />
  </Svg>
))

export default Share
