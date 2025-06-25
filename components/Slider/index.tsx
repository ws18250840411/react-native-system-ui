import React, { useState, useRef } from 'react';
import { View, PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { useTheme } from '../theme';
import { SliderProps } from '../types';
import { getResponsiveSize } from '../utils';

export const Slider: React.FC<SliderProps> = ({
  value = 0,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  onChange,
  style,
  children,
}) => {
  const { theme } = useTheme();
  const responsiveSize = getResponsiveSize();
  const [sliderWidth, setSliderWidth] = useState(0);
  
  // 计算当前值的百分比
  const valuePercent = ((value - min) / (max - min)) * 100;
  
  // 动画值
  const translateX = useSharedValue(0);
  const isDragging = useSharedValue(false);
  
  // 更新值的函数
  const updateValue = (newValue: number) => {
    if (disabled) return;
    
    // 应用步长
    const steppedValue = Math.round((newValue - min) / step) * step + min;
    const clampedValue = Math.max(min, Math.min(max, steppedValue));
    
    onChange?.(clampedValue);
  };
  
  // 手势处理
  const gestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      isDragging.value = true;
    },
    onActive: (event) => {
      if (disabled) return;
      
      const newTranslateX = Math.max(0, Math.min(sliderWidth, event.translationX + (valuePercent / 100) * sliderWidth));
      translateX.value = newTranslateX;
      
      const newPercent = (newTranslateX / sliderWidth) * 100;
      const newValue = min + (newPercent / 100) * (max - min);
      
      runOnJS(updateValue)(newValue);
    },
    onEnd: () => {
      isDragging.value = false;
    },
  });
  
  // 滑块样式
  const trackHeight = 4 * responsiveSize;
  const thumbSize = 20 * responsiveSize;
  
  const trackStyle = {
    height: trackHeight,
    backgroundColor: theme.colors.border,
    borderRadius: trackHeight / 2,
    position: 'relative' as const,
  };
  
  const activeTrackStyle = {
    position: 'absolute' as const,
    left: 0,
    top: 0,
    height: trackHeight,
    width: `${valuePercent}%`,
    backgroundColor: disabled ? theme.colors.disabled : theme.colors.primary,
    borderRadius: trackHeight / 2,
  };
  
  const thumbStyle = useAnimatedStyle(() => {
    const thumbPosition = isDragging.value 
      ? translateX.value 
      : (valuePercent / 100) * sliderWidth;
    
    return {
      position: 'absolute',
      left: thumbPosition - thumbSize / 2,
      top: -thumbSize / 2 + trackHeight / 2,
      width: thumbSize,
      height: thumbSize,
      backgroundColor: disabled ? theme.colors.disabled : theme.colors.primary,
      borderRadius: thumbSize / 2,
      borderWidth: 2,
      borderColor: theme.colors.background,
      shadowColor: theme.colors.dark,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    };
  });
  
  const containerStyle = {
    paddingVertical: thumbSize / 2,
    opacity: disabled ? 0.5 : 1,
  };
  
  return (
    <View style={[containerStyle, style]}>
      <View
        style={trackStyle}
        onLayout={(event) => {
          setSliderWidth(event.nativeEvent.layout.width);
        }}
      >
        <View style={activeTrackStyle} />
        
        <PanGestureHandler
          onGestureEvent={gestureHandler}
          enabled={!disabled}
        >
          <Animated.View style={thumbStyle} />
        </PanGestureHandler>
      </View>
      {children}
    </View>
  );
};

export default Slider;