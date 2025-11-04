/**
 * Polyfill for react-native/Libraries/* 路径
 * 
 * React Native 内部 API，在 react-native-web 中不存在
 * 提供必要的空实现以支持第三方库（如 react-native-safe-area-context）
 */

/**
 * codegenNativeComponent - React Native 新架构的代码生成工具
 * 在 web 环境下返回一个空组件
 */
export default function codegenNativeComponent<Props = {}>(
  componentName: string,
  options?: {
    interfaceOnly?: boolean
    paperComponentName?: string
    excludedPlatforms?: Array<'iOS' | 'android'>
  }
) {
  // 返回一个空的占位组件
  // 实际的组件应该由库的 web 版本提供
  return function WebComponent(_props: Props) {
    return null
  }
}

