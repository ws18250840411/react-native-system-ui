import React from 'react'
import { SafeAreaView, View, type LayoutChangeEvent } from 'react-native'
 
export interface SafeAreaOpts {
  safeArea?: boolean
  safeAreaInsetTop?: boolean
  safeAreaInsetBottom?: boolean
}
 
export const renderWithSafeArea = (
  children: React.ReactNode,
  opts: SafeAreaOpts,
  safeAreaTopRef?: React.RefObject<View>,
  onSafeAreaTopLayout?: (event: LayoutChangeEvent) => void,
) => {
  if (opts.safeArea) {
    return (
      <SafeAreaView style={{ width: '100%' }}>
        {children}
      </SafeAreaView>
    )
  }
  return (
    <>
      {opts.safeAreaInsetTop ? (
        <SafeAreaView
          ref={safeAreaTopRef}
          style={{ width: '100%', pointerEvents: 'none' }}
          onLayout={onSafeAreaTopLayout}
        />
      ) : null}
      {children}
      {opts.safeAreaInsetBottom ? (
        <SafeAreaView style={{ width: '100%', pointerEvents: 'none' }} />
      ) : null}
    </>
  )
}
