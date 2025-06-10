import React from "react";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import { Vibration, Platform } from "react-native";

export function HapticTab(props: BottomTabBarButtonProps) {
  return (
    <PlatformPressable
      {...props}
      onPressIn={(ev) => {
        if (Platform.OS === "ios") {
          // Add a soft haptic feedback when pressing down on the tabs.
          Vibration.vibrate(50); // 50ms的短振动
        }
        props.onPressIn?.(ev);
      }}
    />
  );
}
