import { Platform } from 'react-native'

export const nativeDriverEnabled = Platform.OS !== 'web'

export const defaultAnimationConfig = {
  useNativeDriver: nativeDriverEnabled,
  isInteraction: false as const,
}

export const hardwareAccelerationProps = {
  renderToHardwareTextureAndroid: Platform.OS === 'android',
  shouldRasterizeIOS: Platform.OS === 'ios',
}
