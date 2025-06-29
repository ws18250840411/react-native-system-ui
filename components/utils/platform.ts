import { Platform, Dimensions, PixelRatio } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const pixelRatio = PixelRatio.get();

// 平台检测
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

// 获取状态栏高度
export const getStatusBarHeight = (): number => {
  if (isIOS) {
    // iPhone X 系列及以上
    if (screenHeight >= 812) {
      return 44;
    }
    return 20;
  }
  return 24; // Android
};

// 获取底部安全区域高度
export const getBottomSafeAreaHeight = (): number => {
  if (isIOS && screenHeight >= 812) {
    return 34; // iPhone X 系列及以上
  }
  return 0;
};

// 获取设备信息
export const getDeviceInfo = () => {
  return {
    width: screenWidth,
    height: screenHeight,
    pixelRatio,
    platform: Platform.OS,
    version: Platform.Version,
    isIOS,
    isAndroid,
  };
};

// 获取屏幕信息
export const getScreenInfo = () => {
  return {
    width: screenWidth,
    height: screenHeight,
    pixelRatio,
    isIOS,
    isAndroid,
    statusBarHeight: getStatusBarHeight(),
    bottomSafeAreaHeight: getBottomSafeAreaHeight(),
  };
};