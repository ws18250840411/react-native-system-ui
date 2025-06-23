import type { TextStyle, ViewStyle } from "react-native";
import { StyleSheet } from "react-native";
import { getDeviceWidth } from "./device";

export const flattenStyle = (
  style: ViewStyle | TextStyle | (ViewStyle | TextStyle)[]
) => {
  return StyleSheet.flatten(style);
};

export const filterTextStyle = (style: TextStyle = {}) => {
  return Object.keys(style).reduce((acc: any, key) => {
    if (/^(color|font|text|line)/.test(key)) {
      acc[key] = style[key as keyof TextStyle];
    }
    return acc;
  }, {} as TextStyle);
};

export const pxToRem = (size: number) => {
  const baseWidth = 375;
  const deviceWidth = getDeviceWidth();
  return (size * deviceWidth) / baseWidth;
};
