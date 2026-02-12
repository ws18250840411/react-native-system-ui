import { createComponentTokensHook } from '../../design-system'
import { type Foundations } from '../../design-system/tokens'
import type { ToastType } from './Toast'
export interface ToastTokens {
  colors: {
    text: string
    backdrop: string
    variants: Record<ToastType, string>
    transparent: string
  }
  fontSize: number
  lineHeight: number
  fontFamily: string
  radius: number
  gap: number
  iconSize: number
  maxWidth: number | string
  textMinWidth: number
  textPaddingVertical: number
  textPaddingHorizontal: number
  defaultPadding: number
  defaultWidth: number
  defaultMinHeight: number
  pressedOpacity: number
  positionOffsetRatio: number
  positionOffsetMin: number
  animationDuration: number
}
export const createToastTokens = (foundations: Foundations): ToastTokens => {
  const onDarkText = foundations.palette.primary.foreground ?? '#ffffff'
  const backdrop = 'rgba(0,0,0,0.7)'
  return {
    colors: {
      text: onDarkText,
      backdrop,
      variants: { info: backdrop, success: backdrop, fail: backdrop, loading: backdrop, },
      transparent: 'transparent',
    },
    fontSize: foundations.fontSize.sm,
    lineHeight: Math.round(foundations.fontSize.sm * foundations.typography.lineHeightMultiplier),
    fontFamily: foundations.typography.fontFamily,
    radius: foundations.radii.md,
    gap: foundations.spacing.sm,
    iconSize: 36,
    maxWidth: '70%',
    textMinWidth: 96,
    textPaddingVertical: foundations.spacing.sm,
    textPaddingHorizontal: foundations.spacing.md,
    defaultPadding: foundations.spacing.lg,
    defaultWidth: 88,
    defaultMinHeight: 88,
    pressedOpacity: 0.85,
    positionOffsetRatio: 0.2,
    positionOffsetMin: 60,
    animationDuration: 160,
  }
}
export const useToastTokens = createComponentTokensHook('toast', createToastTokens)
