import React, { memo, useEffect, useRef } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { LoadingProps } from '../types';
import { useTheme } from '../theme';
import { createLoadingStyles } from './styles';

export const Loading: React.FC<LoadingProps> = memo(({
  size = 'md',
  color,
  text,
  vertical = false,
  style,
  testID,
  ...rest
}) => {
  const theme = useTheme();
  const styles = createLoadingStyles(theme, size);
  const spinValue = useRef(new Animated.Value(0)).current;
  
  const loadingColor = color || theme.colors.primary;
  
  useEffect(() => {
    const spin = () => {
      spinValue.setValue(0);
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => spin());
    };
    
    spin();
  }, [spinValue]);
  
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  
  const containerStyle = [
    styles.container,
    vertical ? styles.vertical : styles.horizontal,
    style,
  ];
  
  const spinnerStyle = [
    styles.spinner,
    { borderTopColor: loadingColor },
    { transform: [{ rotate: spin }] },
  ];
  
  return (
    <View style={containerStyle} testID={testID} {...rest}>
      <Animated.View style={spinnerStyle} />
      {text && (
        <Text style={[styles.text, vertical && styles.textVertical]}>
          {text}
        </Text>
      )}
    </View>
  );
});

Loading.displayName = 'Loading';