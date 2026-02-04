import type { ViewProps } from 'react-native'

import type { DeepPartial } from '../../types'

export type SkeletonAvatarShape = 'round' | 'square'

export interface SkeletonTokens {
  defaults: {
    rowCount: number
    rowWidth: number | string
    lastRowWidth: number | string
    rowHeight: number | string
    avatarSize: number | string
    titleWidth: number | string
  }
  colors: {
    block: string
    highlight: string
  }
  radius: number
  spacing: {
    containerGap: number
    rowGap: number
  }
  animation: {
    duration: number
    minOpacity: number
    maxOpacity: number
  }
}

export interface SkeletonProps extends ViewProps {
  /** Gluestack alias: isLoaded=true will render children */
  isLoaded?: boolean
  loading?: boolean
  animate?: boolean
  /** Gluestack alias: skeleton block color */
  startColor?: string
  /** Animation speed multiplier (larger = faster) */
  speed?: number | string
  avatar?: boolean
  avatarSize?: number | string
  avatarShape?: SkeletonAvatarShape
  title?: boolean
  titleWidth?: number | string
  row?: number
  rowWidth?: number | string | Array<number | string>
  rowHeight?: number | string | Array<number | string>
  round?: boolean
  tokensOverride?: DeepPartial<SkeletonTokens>
  children?: React.ReactNode
}
