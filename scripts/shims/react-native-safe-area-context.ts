import React from 'react'
import { View, type ViewProps } from 'react-native'

export type EdgeInsets = { top: number; bottom: number; left: number; right: number }

export const initialWindowMetrics = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, bottom: 0, left: 0, right: 0 },
}

export const SafeAreaProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) =>
  React.createElement(React.Fragment, null, children)

export const SafeAreaView: React.FC<ViewProps> = ({ children, style, ...rest }) =>
  React.createElement(View, { style, ...rest }, children)

export const useSafeAreaInsets = (): EdgeInsets => initialWindowMetrics.insets

export const SafeAreaInsetsContext = React.createContext<EdgeInsets>(initialWindowMetrics.insets)
