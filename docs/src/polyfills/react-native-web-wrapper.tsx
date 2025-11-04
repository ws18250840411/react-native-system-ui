/**
 * React Native Web Wrapper
 * 
 * 重新导出 react-native-web 的所有内容，并添加缺失的组件和 API
 */

// 重新导出 react-native-web 的所有内容
export * from 'react-native-web'

import React from 'react'
import { View, ViewProps } from 'react-native-web'

/**
 * InputAccessoryView (iOS 特定组件)
 * 在 web 环境下作为普通 View 渲染
 */
export const InputAccessoryView: React.FC<ViewProps & { nativeID?: string }> = ({
  children,
  ...props
}) => {
  return <View {...props}>{children}</View>
}

/**
 * TurboModuleRegistry (React Native 新架构)
 * 在 web 环境下提供空实现
 */
export const TurboModuleRegistry = {
  get<T>(moduleName: string): T | null {
    if (__DEV__) {
      console.warn(`[TurboModuleRegistry] Module '${moduleName}' is not available in web`)
    }
    return null
  },
  getEnforcing<T>(moduleName: string): T {
    throw new Error(`[TurboModuleRegistry] Module '${moduleName}' is not available in web`)
  },
}

