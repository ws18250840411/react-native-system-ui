import React from 'react'
import { View } from 'react-native'

type Options = {
  interfaceOnly?: boolean
}

export default function codegenNativeComponent<Props>(componentName: string, _options?: Options) {
  const Component = React.forwardRef<React.ElementRef<typeof View>, Props>((props, ref) => (
    <View {...(props as any)} ref={ref as never} />
  ))
  Component.displayName = componentName
  return Component as unknown as React.ComponentType<Props>
}
