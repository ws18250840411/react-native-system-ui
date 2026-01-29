import React from 'react'
import { View, type ViewProps } from 'react-native'

export type EdgeInsets = { top: number; bottom: number; left: number; right: number }

export const initialWindowMetrics = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, bottom: 0, left: 0, right: 0 },
}

/** Web 文档构建用：仅做占位，不引入原生 TurboModule。实际安全区由各组件内按平台兼容。 */
export const SafeAreaProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) =>
  React.createElement(React.Fragment, null, children)

/** Web 下 SafeAreaView 等价于 View，安全区由使用方组件内用 env() 或 insets 处理。 */
export const SafeAreaView: React.FC<ViewProps> = ({ children, style, ...rest }) =>
  React.createElement(View, { style, ...rest }, children)

export const useSafeAreaInsets = (): EdgeInsets => initialWindowMetrics.insets

export const SafeAreaInsetsContext = React.createContext<EdgeInsets>(initialWindowMetrics.insets)
