import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { createIcon } from '../createIcon'

const BagO = createIcon(({ size, primaryColor }, svgProps) => (
  <Svg {...svgProps} width={size} height={size} viewBox="0 0 1024 1024" fill="none">
    <Path
          d="M258.088 333.333L223.366 888.89H771.76l-34.722-555.556h-478.95zm236.499-166.666c-59.495 0-108.135 49.524-108.135 111.11h-55.555c0-92.047 73.286-166.666 163.69-166.666s163.69 74.62 163.69 166.667h95.433c19.966 0 36.49 15.524 37.735 35.45l36.941 591.05c1.303 20.84-14.536 38.79-35.376 40.093-.786.049-1.572.073-2.359.073H204.475c-20.88 0-37.808-16.927-37.808-37.808 0-.787.024-1.573.073-2.359l36.94-591.049c1.246-19.926 17.77-35.45 37.736-35.45h361.306c0-61.587-48.64-111.111-108.135-111.111z"
          fillRule="nonzero"
        />
  </Svg>
))

export default BagO
