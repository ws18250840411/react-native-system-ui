import { Platform } from "react-native";

export const requestAnimationFrame = (
  callback: FrameRequestCallback
): number => {
  if (Platform.OS !== "web") {
    return setTimeout(() => callback(Date.now()), 1000 / 60);
  }
  return global.requestAnimationFrame(callback);
};

export const cancelAnimationFrame = (handle: number): void => {
  if (Platform.OS !== "web") {
    clearTimeout(handle);
    return;
  }
  global.cancelAnimationFrame(handle);
};
