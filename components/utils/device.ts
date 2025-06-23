import { Dimensions, Platform, StatusBar } from "react-native";

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");

export const getDeviceWidth = () => WINDOW_WIDTH;

export const getDeviceHeight = () => WINDOW_HEIGHT;

export const getStatusBarHeight = () => {
  if (Platform.OS === "ios") {
    return isIphoneX() ? 44 : 20;
  }
  return StatusBar.currentHeight || 0;
};

export const isIphoneX = () => {
  const dimen = Dimensions.get("window");
  return (
    Platform.OS === "ios" &&
    !Platform.isPad &&
    !Platform.isTV &&
    (dimen.height === 780 ||
      dimen.width === 780 ||
      dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 844 ||
      dimen.width === 844 ||
      dimen.height === 896 ||
      dimen.width === 896 ||
      dimen.height === 926 ||
      dimen.width === 926)
  );
};
