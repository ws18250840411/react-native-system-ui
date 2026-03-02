import { Easing, type ViewStyle } from 'react-native'
import type { PopupPlacement } from '../../components/popup/types'

export const EASE_OUT = Easing.bezier(0.075, 0.82, 0.165, 1.0)
export const EASE_IN = Easing.bezier(0.55, 0.055, 0.675, 0.19)
export const CAPTURE = () => true
export const hiddenStyle: ViewStyle = { opacity: 0, shadowOpacity: 0, shadowRadius: 0, elevation: 0 }

export const placementConfig: Record<PopupPlacement, { container: ViewStyle; axis: 'x' | 'y' }> = { top: { container: { justifyContent: 'flex-start', alignItems: 'center' }, axis: 'y' }, bottom: { container: { justifyContent: 'flex-end', alignItems: 'center' }, axis: 'y' }, left: { container: { justifyContent: 'center', alignItems: 'flex-start' }, axis: 'x' }, right: { container: { justifyContent: 'center', alignItems: 'flex-end' }, axis: 'x' }, center: { container: { justifyContent: 'center', alignItems: 'center' }, axis: 'y' } }
export const CONTENT_SELF: Record<PopupPlacement, ViewStyle> = { top: { alignSelf: 'stretch' }, bottom: { alignSelf: 'stretch' }, left: { alignSelf: 'flex-start' }, right: { alignSelf: 'flex-end' }, center: { alignSelf: 'center' } }
export const buildRadius = (round: boolean | undefined, p: PopupPlacement, r: number): ViewStyle | undefined => !round ? undefined : p === 'top' ? { borderBottomLeftRadius: r, borderBottomRightRadius: r } : p === 'bottom' ? { borderTopLeftRadius: r, borderTopRightRadius: r } : p === 'left' ? { borderTopRightRadius: r, borderBottomRightRadius: r } : p === 'right' ? { borderTopLeftRadius: r, borderBottomLeftRadius: r } : { borderRadius: r }
