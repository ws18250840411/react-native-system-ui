import { Platform, StyleSheet, type ViewStyle } from 'react-native'

/**
 * 获取 hairline 边框宽度
 * - React Native: 使用 StyleSheet.hairlineWidth (约 0.5px)
 * - Web: 返回 1，配合 transform scale 实现 0.5px 效果
 */
export const getHairlineWidth = (): number => {
  return Platform.OS === 'web' ? 1 : StyleSheet.hairlineWidth
}

/**
 * 创建 hairline 边框样式对象
 * 兼容 web 和 React Native，确保显示效果一致（0.5px）
 *
 * 注意：此函数用于直接在元素上设置边框，不会改变元素尺寸
 * 对于需要独立边框 View 的场景，请使用 createHairlineView
 *
 * @param options 边框配置选项
 * @returns 包含边框宽度和颜色的样式对象
 *
 * @example
 * ```tsx
 * const borderStyle = createHairlineBorder({ color: '#ebedf0', position: 'bottom' })
 * <View style={[baseStyle, borderStyle]} />
 * ```
 */
export interface HairlineBorderOptions {
  /** 边框颜色 */
  color?: string
  /** 边框位置：top, right, bottom, left, all */
  position?: 'top' | 'right' | 'bottom' | 'left' | 'all'
  /** 是否启用 hairline（默认 true） */
  enabled?: boolean
}

export const createHairlineBorder = (
  options: HairlineBorderOptions = {}
): ViewStyle => {
  const { color, position = 'all', enabled = true } = options

  if (!enabled) {
    return {}
  }

  const isWeb = Platform.OS === 'web'
  // Web 上使用 1px（浏览器会自动处理为物理像素的 0.5px）
  // React Native 上使用 hairlineWidth（已经是 0.5px）
  const borderWidth = isWeb ? 1 : StyleSheet.hairlineWidth

  const style: ViewStyle = {}

  // 设置边框宽度
  if (position === 'all') {
    style.borderWidth = borderWidth
  } else {
    const borderKey = `border${position.charAt(0).toUpperCase() + position.slice(1)}Width` as keyof ViewStyle
      ; (style as any)[borderKey] = borderWidth
  }

  // 设置边框颜色
  if (color) {
    if (position === 'all') {
      style.borderColor = color
    } else {
      const colorKey = `border${position.charAt(0).toUpperCase() + position.slice(1)}Color` as keyof ViewStyle
        ; (style as any)[colorKey] = color
    }
  }

  return style
}

/**
 * 创建单个方向的 hairline 边框样式
 * 便捷函数，用于创建特定方向的边框
 */
export const createHairlineBorderTop = (color?: string): ViewStyle =>
  createHairlineBorder({ color, position: 'top' })

export const createHairlineBorderRight = (color?: string): ViewStyle =>
  createHairlineBorder({ color, position: 'right' })

export const createHairlineBorderBottom = (color?: string): ViewStyle =>
  createHairlineBorder({ color, position: 'bottom' })

export const createHairlineBorderLeft = (color?: string): ViewStyle =>
  createHairlineBorder({ color, position: 'left' })

/**
 * 创建独立的 hairline 边框组件样式
 * 用于需要单独 View 作为边框的场景（如 Cell 组件的底部边框）
 * 在 web 上使用 transform scale 实现真正的 0.5px 效果
 *
 * @param options 边框配置选项
 * @returns 样式对象，包含定位、边框样式和 transform
 *
 * @example
 * ```tsx
 * const hairlineStyle = createHairlineView({ 
 *   position: 'bottom', 
 *   color: '#ebedf0',
 *   left: 16,
 *   right: 16 
 * })
 * <View style={[styles.hairline, hairlineStyle]} />
 * ```
 */
export interface HairlineViewOptions extends HairlineBorderOptions {
  /** 左边距（用于 inset） */
  left?: number
  /** 右边距（用于 inset） */
  right?: number
  /** 上边距（用于 inset） */
  top?: number
  /** 下边距（用于 inset） */
  bottom?: number
  /** 自定义边框宽度（如果指定，将覆盖默认的 hairline 宽度） */
  width?: number
}

export const createHairlineView = (
  options: HairlineViewOptions = {}
): ViewStyle => {
  const { left, right, top, bottom, position = 'bottom', width, ...borderOptions } = options

  const isWeb = Platform.OS === 'web'
  // 如果指定了自定义宽度，使用自定义宽度；否则使用 hairline 宽度
  const borderWidth = width !== undefined ? width : (isWeb ? 1 : StyleSheet.hairlineWidth)
  // 如果指定了自定义宽度且不是 hairline 宽度，则不使用 transform scale
  const useTransform = isWeb && (width === undefined || width === StyleSheet.hairlineWidth || width === 1)

  const style: ViewStyle = {
    position: 'absolute',
    pointerEvents: 'none',
  }

  // 设置定位
  if (left !== undefined) style.left = left
  if (right !== undefined) style.right = right
  if (top !== undefined) style.top = top
  if (bottom !== undefined) style.bottom = bottom

  // 根据 position 设置默认位置和边框
  if (position === 'top') {
    if (top === undefined) style.top = 0
    style.borderTopWidth = borderWidth
    if (borderOptions.color) style.borderTopColor = borderOptions.color
    // Web 上通过 transform scale 实现 0.5px 效果
    if (useTransform) style.transform = [{ scaleY: 0.5 }]
  } else if (position === 'bottom') {
    if (bottom === undefined) style.bottom = 0
    style.borderBottomWidth = borderWidth
    if (borderOptions.color) style.borderBottomColor = borderOptions.color
    // Web 上通过 transform scale 实现 0.5px 效果
    if (useTransform) style.transform = [{ scaleY: 0.5 }]
  } else if (position === 'left') {
    if (left === undefined) style.left = 0
    style.borderLeftWidth = borderWidth
    if (borderOptions.color) style.borderLeftColor = borderOptions.color
    // Web 上通过 transform scale 实现 0.5px 效果
    if (useTransform) style.transform = [{ scaleX: 0.5 }]
  } else if (position === 'right') {
    if (right === undefined) style.right = 0
    style.borderRightWidth = borderWidth
    if (borderOptions.color) style.borderRightColor = borderOptions.color
    // Web 上通过 transform scale 实现 0.5px 效果
    if (useTransform) style.transform = [{ scaleX: 0.5 }]
  } else if (position === 'all') {
    style.borderWidth = borderWidth
    if (borderOptions.color) style.borderColor = borderOptions.color
    // Web 上通过 transform scale 实现 0.5px 效果
    if (useTransform) style.transform = [{ scale: 0.5 }]
  }

  return style
}

