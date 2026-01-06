import type { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native'

import type { DeepPartial } from '../../types'
import type { EmptyTokens } from './Empty'

export type EmptyImage = 'default' | 'error' | 'network' | 'search'

export interface EmptyProps extends ViewProps {
  image?: EmptyImage | string | React.ReactNode
  imageSize?: number
  imageStyle?: StyleProp<ViewStyle>
  description?: React.ReactNode
  descriptionStyle?: StyleProp<TextStyle>
  children?: React.ReactNode
  gap?: number
  tokensOverride?: DeepPartial<EmptyTokens>
}
