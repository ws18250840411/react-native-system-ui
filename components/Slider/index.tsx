import React, { useState, useMemo } from 'react';
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated';
import { useTheme } from '../theme/ThemeProvider';
import { SliderProps } from '../types';
import { responsive } from '../utils';

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
  const responsiveSize = responsive(1);
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
  const panGesture = useMemo(() => {
    return Gesture.Pan()
      .onStart(() => {
        isDragging.value = true;
      })
      .onUpdate((event) => {
        if (disabled) return;
        
        const newTranslateX = Math.max(0, Math.min(sliderWidth, event.translationX + (valuePercent / 100) * sliderWidth));
        translateX.value = newTranslateX;
        
        const newPercent = (newTranslateX / sliderWidth) * 100;
        const newValue = min + (newPercent / 100) * (max - min);
        
        runOnJS(updateValue)(newValue);
      })
      .onEnd(() => {
        isDragging.value = false;
      })
      .enabled(!disabled);
  }, [disabled, sliderWidth, valuePercent, min, max, isDragging, translateX, updateValue]);
  
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
    width: sliderWidth * (valuePercent / 100),
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
        onLayout={(event: any) => {
          setSliderWidth(event.nativeEvent.layout.width);
        }}
      >
        <View style={activeTrackStyle} />
        
        <GestureDetector gesture={panGesture}>
          <Animated.View style={thumbStyle} />
        </GestureDetector>
      </View>
      {children}
    </View>
  );
};

export default Slider;