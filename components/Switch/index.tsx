import React, { useRef, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  Easing,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { SwitchProps, ComponentSize } from '../types';
import { useTheme } from '../theme/ThemeProvider';
import { getSizeValue, responsive, hexToRgba } from '../utils';

const Switch: React.FC<SwitchProps> = ({
  value = false,
  size = 'medium',
  disabled = false,
  activeColor,
  inactiveColor,
  onChange,
  style,
}) => {
  const theme = useTheme();
  const translateX = useRef(new Animated.Value(value ? 1 : 0)).current;

  // 当value变化时，执行动画
  useEffect(() => {
    Animated.timing(translateX, {
      toValue: value ? 1 : 0,
      duration: 200,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  }, [value, translateX]);

  // 计算样式
  const styles = useMemo(() => {
    const baseSize = getSizeValue(size);
    const trackWidth = baseSize * 1.6;
    const trackHeight = baseSize * 0.9;
    const thumbSize = trackHeight - responsive(4);
    
    const activeTrackColor = activeColor || theme.colors.primary;
    const inactiveTrackColor = inactiveColor || theme.colors.border;
    
    const trackStyle: ViewStyle = {
      width: trackWidth,
      height: trackHeight,
      borderRadius: trackHeight / 2,
      backgroundColor: value ? activeTrackColor : inactiveTrackColor,
      justifyContent: 'center',
      paddingHorizontal: responsive(2),
      opacity: disabled ? 0.5 : 1,
    };

    const thumbStyle: ViewStyle = {
      width: thumbSize,
      height: thumbSize,
      borderRadius: thumbSize / 2,
      backgroundColor: '#FFFFFF',
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    };

    return {
      trackStyle,
      thumbStyle,
      trackWidth,
      thumbSize,
    };
  }, [theme, size, value, activeColor, inactiveColor, disabled]);

  // 处理点击事件
  const handlePress = useCallback(() => {
    if (disabled || !onChange) return;
    onChange(!value);
  }, [disabled, onChange, value]);

  // 计算thumb的位移
  const thumbTranslateX = translateX.interpolate({
    inputRange: [0, 1],
    outputRange: [0, styles.trackWidth - styles.thumbSize - responsive(4)],
  });

  return (
    <TouchableOpacity
      style={[styles.trackStyle, style]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Animated.View
        style={[
          styles.thumbStyle,
          {
            transform: [{ translateX: thumbTranslateX }],
          },
        ]}
      />
    </TouchableOpacity>
  );
};

export default React.memo(Switch);