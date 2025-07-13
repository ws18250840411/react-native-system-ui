import React, { memo, useCallback, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import { SwitchProps } from '../types';
import { useTheme } from '../theme';
import { createSwitchStyles } from './styles';

export const Switch: React.FC<SwitchProps> = memo(({
  value = false,
  defaultValue = false,
  disabled = false,
  size = 'md',
  activeColor,
  inactiveColor,
  thumbColor,
  onChange,
  style,
  testID,
  ...rest
}) => {
  const theme = useTheme();
  const styles = createSwitchStyles(theme, size);
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  
  const switchValue = value !== undefined ? value : internalValue;
  
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: switchValue ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [switchValue, animatedValue]);
  
  const handlePress = useCallback(() => {
    if (disabled) return;
    
    const newValue = !switchValue;
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  }, [disabled, switchValue, value, onChange]);
  
  const trackColor = activeColor || theme.colors.primary;
  const trackInactiveColor = inactiveColor || theme.colors.borderLight;
  const thumbActiveColor = thumbColor || theme.colors.background;
  
  const trackStyle = [
    styles.track,
    {
      backgroundColor: animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [trackInactiveColor, trackColor],
      }),
    },
    disabled && styles.trackDisabled,
    style,
  ];
  
  const thumbStyle = [
    styles.thumb,
    {
      backgroundColor: thumbActiveColor,
      transform: [
        {
          translateX: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, styles.track.width - styles.thumb.width - 4],
          }),
        },
      ],
    },
    disabled && styles.thumbDisabled,
  ];
  
  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.8}
      testID={testID}
      {...rest}
    >
      <Animated.View style={trackStyle}>
        <Animated.View style={thumbStyle} />
      </Animated.View>
    </TouchableOpacity>
  );
});

Switch.displayName = 'Switch';