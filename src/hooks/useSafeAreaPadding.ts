import { useMemo } from 'react'
import { Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
export type SafeAreaPaddingMin = { top?: number; bottom?: number; left?: number; right?: number }
export type SafeAreaPaddingResult = { paddingTop: number | string; paddingBottom: number | string; paddingLeft: number | string; paddingRight: number | string }
export function useSafeAreaPadding(min?: SafeAreaPaddingMin): SafeAreaPaddingResult {
  const insets = useSafeAreaInsets()
  const [t, b, l, r] = [min?.top ?? 0, min?.bottom ?? 0, min?.left ?? 0, min?.right ?? 0]
  return useMemo(() => {
    if (Platform.OS === 'web') {
      return { paddingTop: `max(env(safe-area-inset-top, 0px), ${t}px)`, paddingBottom: `max(env(safe-area-inset-bottom, 0px), ${b}px)`, paddingLeft: `max(env(safe-area-inset-left, 0px), ${l}px)`, paddingRight: `max(env(safe-area-inset-right, 0px), ${r}px)` }
    }
    return { paddingTop: Math.max(insets.top, t), paddingBottom: Math.max(insets.bottom, b), paddingLeft: Math.max(insets.left, l), paddingRight: Math.max(insets.right, r) }
  }, [b, insets.bottom, insets.left, insets.right, insets.top, l, r, t])
}
