import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { useTheme } from '../theme';
import { DrawerProps } from '../types';
import { getResponsiveSize } from '../utils';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const Drawer: React.FC<DrawerProps> = ({
  visible = false,
  placement = 'left',
  width = 280,
  height = 280,
  title,
  closable = true,
  maskClosable = true,
  onClose,
  style,
  children,
}) => {
  const { theme } = useTheme();
  const responsiveSize = getResponsiveSize();
  
  const animatedValue = useSharedValue(0);
  const maskOpacity = useSharedValue(0);
  
  useEffect(() => {
    animatedValue.value = withTiming(visible ? 1 : 0, { duration: 300 });
    maskOpacity.value = withTiming(visible ? 1 : 0, { duration: 300 });
  }, [visible, animatedValue, maskOpacity]);
  
  const isHorizontal = placement === 'left' || placement === 'right';
  const drawerSize = isHorizontal 
    ? (typeof width === 'string' ? screenWidth * 0.8 : width)
    : (typeof height === 'string' ? screenHeight * 0.8 : height);
  
  const getTranslateValue = () => {
    switch (placement) {
      case 'left':
        return interpolate(animatedValue.value, [0, 1], [-drawerSize, 0], Extrapolate.CLAMP);
      case 'right':
        return interpolate(animatedValue.value, [0, 1], [drawerSize, 0], Extrapolate.CLAMP);
      case 'top':
        return interpolate(animatedValue.value, [0, 1], [-drawerSize, 0], Extrapolate.CLAMP);
      case 'bottom':
        return interpolate(animatedValue.value, [0, 1], [drawerSize, 0], Extrapolate.CLAMP);
      default:
        return 0;
    }
  };
  
  const drawerAnimatedStyle = useAnimatedStyle(() => {
    const translateValue = getTranslateValue();
    
    return {
      transform: isHorizontal 
        ? [{ translateX: translateValue }]
        : [{ translateY: translateValue }],
    };
  });
  
  const maskAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: maskOpacity.value,
    };
  });
  
  const getDrawerPosition = () => {
    switch (placement) {
      case 'left':
        return { left: 0, top: 0, bottom: 0 };
      case 'right':
        return { right: 0, top: 0, bottom: 0 };
      case 'top':
        return { top: 0, left: 0, right: 0 };
      case 'bottom':
        return { bottom: 0, left: 0, right: 0 };
      default:
        return { left: 0, top: 0, bottom: 0 };
    }
  };
  
  const drawerStyle = {
    position: 'absolute' as const,
    ...getDrawerPosition(),
    width: isHorizontal ? drawerSize : '100%',
    height: isHorizontal ? '100%' : drawerSize,
    backgroundColor: theme.colors.background,
    shadowColor: theme.colors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  };
  
  const headerStyle = {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingHorizontal: theme.spacing.md * responsiveSize,
    paddingVertical: theme.spacing.sm * responsiveSize,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  };
  
  const titleStyle = {
    fontSize: theme.fontSize.lg * responsiveSize,
    fontWeight: 'bold' as const,
    color: theme.colors.text,
  };
  
  const closeButtonStyle = {
    padding: theme.spacing.xs * responsiveSize,
  };
  
  const closeButtonTextStyle = {
    fontSize: theme.fontSize.lg * responsiveSize,
    color: theme.colors.textSecondary,
  };
  
  const contentStyle = {
    flex: 1,
    padding: theme.spacing.md * responsiveSize,
  };
  
  const maskStyle = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  };
  
  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={{ flex: 1 }}>
        <Animated.View style={[maskStyle, maskAnimatedStyle]}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={maskClosable ? onClose : undefined}
            activeOpacity={1}
          />
        </Animated.View>
        
        <Animated.View style={[drawerStyle, drawerAnimatedStyle, style]}>
          {(title || closable) && (
            <View style={headerStyle}>
              {title && <Text style={titleStyle}>{title}</Text>}
              {closable && (
                <TouchableOpacity style={closeButtonStyle} onPress={onClose}>
                  <Text style={closeButtonTextStyle}>✕</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          
          <View style={contentStyle}>
            {children}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default Drawer;