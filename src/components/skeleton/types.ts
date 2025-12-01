import type { ViewProps } from 'react-native'

export type SkeletonAvatarShape = 'round' | 'square'

export interface SkeletonProps extends ViewProps {
  loading?: boolean
  animate?: boolean
  avatar?: boolean
  avatarSize?: number | string
  avatarShape?: SkeletonAvatarShape
  title?: boolean
  titleWidth?: number | string
  row?: number
  rowWidth?: number | string | Array<number | string>
  rowHeight?: number | string | Array<number | string>
  round?: boolean
  children?: React.ReactNode
}
