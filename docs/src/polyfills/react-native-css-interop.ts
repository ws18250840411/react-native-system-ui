import React from 'react';

export const StyleSheet = {
  create<T extends Record<string, any>>(styles: T): T {
    return styles;
  },
  compose(...styles: Array<any>) {
    return styles.filter(Boolean);
  },
};

export const colorScheme = {
  get() {
    return 'light' as const;
  },
  set() {
    // no-op in docs environment
  },
  subscribe() {
    return () => {};
  },
};

export const createInteropElement = (
  Component: any,
  props: Record<string, any>,
) => React.createElement(Component, props);

export const cssInterop = <T extends React.ComponentType<any>>(component: T): T => component;
export const remapProps = cssInterop;

export const rem = (value: number | string) => value;

export const useColorScheme = () => 'light' as const;
export const useSafeAreaEnv = () => ({ top: 0, right: 0, bottom: 0, left: 0 });
export const useUnstableNativeVariable = () => undefined;
export const vars = () => ({}) as Record<string, string>;
export const wrapJSX = <P,>(element: React.ReactElement<P>) => element;
export const createElement = React.createElement;

export default {
  StyleSheet,
  colorScheme,
  createInteropElement,
  cssInterop,
  rem,
  remapProps,
  useColorScheme,
  useSafeAreaEnv,
  useUnstableNativeVariable,
  vars,
  wrapJSX,
  createElement,
};
