import type React from 'react'

type SvgRuntime = {
  Svg?: React.ComponentType<any>
  Circle?: React.ComponentType<any>
  SvgUri?: React.ComponentType<any>
}

let runtimeCache: SvgRuntime | null | undefined
let warned = false

const warnMissing = () => {
  if (warned || typeof __DEV__ === 'undefined' || !__DEV__) return
  warned = true
  console.warn('[react-native-system-ui] SVG support is optional. Install `react-native-svg` to use `Image` SVG rendering or `Circle` on native.')
}

export const getSvgRuntime = (): SvgRuntime | null => {
  if (runtimeCache !== undefined) return runtimeCache
  try {
    const mod = require('react-native-svg')
    runtimeCache = {
      Svg: mod.default ?? mod.Svg ?? mod,
      Circle: mod.Circle,
      SvgUri: mod.SvgUri,
    }
    return runtimeCache
  } catch {
    warnMissing()
    runtimeCache = null
    return runtimeCache
  }
}
