export * from "./animation";
export * from "./date";
export * from "./device";
export * from "./format";
export * from "./style";

export const VERSION = "1.0.0";

export const isDev = process.env.NODE_ENV === "development";

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | any;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let previous = 0;

  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - previous > wait) {
      func(...args);
      previous = now;
    }
  };
};
