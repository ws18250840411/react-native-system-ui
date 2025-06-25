import React, { useEffect, useRef, useMemo } from 'react';
import {
  View,
  Text,
  Animated,
  Easing,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { LoadingProps, ComponentSize } from '../types';
import { useTheme } from '../theme/ThemeProvider';
import { getSizeValue, responsive } from '../utils';

const Loading: React.FC<LoadingProps> = ({
  size = 'medium',
  color,
  text,
  vertical = false,
  style,
}) => {
  const theme = useTheme();
  const spinValue = useRef(new Animated.Value(0)).current;

  // 启动旋转动画
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

  // 计算样式
  const styles = useMemo(() => {
    const spinnerSize = getSizeValue(size) * 0.6;
    const loadingColor = color || theme.colors.primary;
    
    const containerStyle: ViewStyle = {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: vertical ? 'column' : 'row',
    };

    const spinnerStyle: ViewStyle = {
      width: spinnerSize,
      height: spinnerSize,
      borderRadius: spinnerSize / 2,
      borderWidth: responsive(2),
      borderColor: 'transparent',
      borderTopColor: loadingColor,
      marginRight: vertical ? 0 : (text ? theme.spacing.sm : 0),
      marginBottom: vertical ? (text ? theme.spacing.sm : 0) : 0,
    };

    const textStyle: TextStyle = {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    };

    return {
      containerStyle,
      spinnerStyle,
      textStyle,
    };
  }, [theme, size, color, vertical, text]);

  // 旋转插值
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // 渲染加载指示器
  const renderSpinner = () => {
    return (
      <Animated.View
        style={[
          styles.spinnerStyle,
          {
            transform: [{ rotate: spin }],
          },
        ]}
      />
    );
  };

  // 渲染文本
  const renderText = () => {
    if (!text) return null;

    return (
      <Text style={styles.textStyle}>
        {text}
      </Text>
    );
  };

  return (
    <View style={[styles.containerStyle, style]}>
      {renderSpinner()}
      {renderText()}
    </View>
  );
};

export default React.memo(Loading);