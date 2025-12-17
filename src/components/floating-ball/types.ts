import type React from 'react'
import type { ViewProps } from 'react-native'

export interface FloatingBallPosition {
  x: number
  y: number
}

export type FloatingBallOffset = {
  top?: number | string
  right?: number | string
  bottom?: number | string
  left?: number | string
}

export type FloatingBallAdsorbProps = {
  /** 距离吸附边的距离 */
  distance?: number
  /** @deprecated RN 暂不支持滚动缩进，预留字段 */
  indent?: boolean | number
}

export type FloatingBallMenuDirection = 'around' | 'vertical' | 'horizontal'

export type FloatingBallMenuProps = {
  /** 菜单项，最多支持 5 个 */
  items?: React.ReactNode[]
  /** 菜单激活状态（受控） */
  active?: boolean
  /** 默认激活状态（非受控） */
  defaultActive?: boolean
  /** 菜单状态变化回调 */
  onChange?: (active?: boolean) => void
  /** 菜单展开方向 */
  direction?: FloatingBallMenuDirection
  /** 点击菜单项是否关闭菜单 */
  itemClickClose?: boolean
}

export type FloatingBallInstance = {
  /** 打开菜单 */
  open: () => void
  /** 关闭菜单 */
  close: () => void
}

export interface FloatingBallProps extends ViewProps {
  /** 近边吸附能力（别名：magnetic） */
  adsorb?: boolean | FloatingBallAdsorbProps
  /** 限制拖动范围在屏幕边界内 */
  boundary?: boolean
  /** 初始位置（react-vant 风格） */
  offset?: FloatingBallOffset
  /** 菜单配置 */
  menu?: FloatingBallMenuProps

  /** 受控位置（旧版 API） */
  defaultPosition?: FloatingBallPosition
  /** 受控位置（旧版 API） */
  position?: FloatingBallPosition
  /** 是否自动吸附左右边缘（旧版 API，别名：adsorb） */
  magnetic?: boolean
  draggable?: boolean
  disabled?: boolean
  size?: number
  padding?: number
  onChange?: (position: FloatingBallPosition) => void
  onPress?: () => void
  children?: React.ReactNode | ((p: { active: boolean; indenting: boolean }) => React.ReactNode)
}
