import React, { useEffect } from 'react';
import { Dimensions, Modal as RNModal, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../theme/ThemeProvider';
import { ModalProps } from '../types';
import { responsive } from '../utils';

const { width: screenWidth } = Dimensions.get('window');

export const Modal: React.FC<ModalProps> = ({
  visible = false,
  title,
  closable = true,
  maskClosable = true,
  width = '80%',
  onOk,
  onCancel,
  footer,
  style,
  children,
}) => {
  const { theme } = useTheme();
  const responsiveSize = responsive(1);
  
  const animatedValue = useSharedValue(0);
  const maskOpacity = useSharedValue(0);
  
  useEffect(() => {
    animatedValue.value = withTiming(visible ? 1 : 0, { duration: 300 });
    maskOpacity.value = withTiming(visible ? 1 : 0, { duration: 300 });
  }, [visible, animatedValue, maskOpacity]);
  
  const modalAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(animatedValue.value, [0, 1], [0.8, 1], Extrapolation.CLAMP);
    const opacity = interpolate(animatedValue.value, [0, 1], [0, 1], Extrapolation.CLAMP);
    
    return {
      transform: [{ scale }],
      opacity,
    };
  });
  
  const maskAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: maskOpacity.value,
    };
  });
  
  const modalWidth = typeof width === 'string' 
    ? width.includes('%') 
      ? (parseFloat(width) / 100) * screenWidth
      : screenWidth * 0.8
    : width;
  
  const containerStyle = {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    paddingHorizontal: theme.spacing.md * responsiveSize,
  };
  
  const modalStyle = {
    width: modalWidth,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg * responsiveSize,
    shadowColor: theme.colors.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 12,
    overflow: 'hidden' as const,
  };
  
  const headerStyle = {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingHorizontal: theme.spacing.lg * responsiveSize,
    paddingVertical: theme.spacing.md * responsiveSize,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  };
  
  const titleStyle = {
    fontSize: theme.fontSize.lg * responsiveSize,
    fontWeight: 'bold' as const,
    color: theme.colors.text,
    flex: 1,
  };
  
  const closeButtonStyle = {
    padding: theme.spacing.xs * responsiveSize,
    marginLeft: theme.spacing.sm * responsiveSize,
  };
  
  const closeButtonTextStyle = {
    fontSize: theme.fontSize.lg * responsiveSize,
    color: theme.colors.textSecondary,
  };
  
  const contentStyle = {
    padding: theme.spacing.lg * responsiveSize,
    minHeight: 100 * responsiveSize,
  };
  
  const footerStyle = {
    flexDirection: 'row' as const,
    justifyContent: 'flex-end' as const,
    alignItems: 'center' as const,
    paddingHorizontal: theme.spacing.lg * responsiveSize,
    paddingVertical: theme.spacing.md * responsiveSize,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    gap: theme.spacing.sm * responsiveSize,
  };
  
  const buttonStyle = {
    paddingHorizontal: theme.spacing.md * responsiveSize,
    paddingVertical: theme.spacing.sm * responsiveSize,
    borderRadius: theme.borderRadius.md * responsiveSize,
    minWidth: 80 * responsiveSize,
    alignItems: 'center' as const,
  };
  
  const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: theme.colors.light,
    borderWidth: 1,
    borderColor: theme.colors.border,
  };
  
  const okButtonStyle = {
    ...buttonStyle,
    backgroundColor: theme.colors.primary,
  };
  
  const cancelButtonTextStyle = {
    fontSize: theme.fontSize.md * responsiveSize,
    color: theme.colors.text,
  };
  
  const okButtonTextStyle = {
    fontSize: theme.fontSize.md * responsiveSize,
    color: theme.colors.background,
    fontWeight: '500' as const,
  };
  
  const maskStyle = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  };
  
  const renderDefaultFooter = () => (
    <View style={footerStyle}>
      <TouchableOpacity style={cancelButtonStyle} onPress={onCancel}>
        <Text style={cancelButtonTextStyle}>取消</Text>
      </TouchableOpacity>
      <TouchableOpacity style={okButtonStyle} onPress={onOk}>
        <Text style={okButtonTextStyle}>确定</Text>
      </TouchableOpacity>
    </View>
  );
  
  return (
    <RNModal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onCancel}
    >
      <View style={containerStyle}>
        <Animated.View style={[maskStyle, maskAnimatedStyle]}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={maskClosable ? onCancel : undefined}
            activeOpacity={1}
          />
        </Animated.View>
        
        <Animated.View style={[modalStyle, modalAnimatedStyle, style]}>
          {(title || closable) && (
            <View style={headerStyle}>
              {title && <Text style={titleStyle}>{title}</Text>}
              {closable && (
                <TouchableOpacity style={closeButtonStyle} onPress={onCancel}>
                  <Text style={closeButtonTextStyle}>✕</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          
          <View style={contentStyle}>
            {children}
          </View>
          
          {footer !== null && (
            footer || renderDefaultFooter()
          )}
        </Animated.View>
      </View>
    </RNModal>
  );
};

export default Modal;