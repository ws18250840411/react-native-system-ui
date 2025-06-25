import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Modal, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { useTheme } from '../theme';
import { PopoverProps } from '../types';
import { getResponsiveSize } from '../utils';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const Popover: React.FC<PopoverProps> = ({
  content,
  title,
  trigger = 'click',
  placement = 'top',
  visible: controlledVisible,
  onVisibleChange,
  style,
  children,
}) => {
  const { theme } = useTheme();
  const responsiveSize = getResponsiveSize();
  const [internalVisible, setInternalVisible] = useState(false);
  const [triggerLayout, setTriggerLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const triggerRef = useRef<View>(null);
  
  const visible = controlledVisible !== undefined ? controlledVisible : internalVisible;
  
  const animatedValue = useSharedValue(0);
  const maskOpacity = useSharedValue(0);
  
  React.useEffect(() => {
    animatedValue.value = withTiming(visible ? 1 : 0, { duration: 200 });
    maskOpacity.value = withTiming(visible ? 1 : 0, { duration: 200 });
  }, [visible, animatedValue, maskOpacity]);
  
  const handleVisibleChange = (newVisible: boolean) => {
    if (onVisibleChange) {
      onVisibleChange(newVisible);
    } else {
      setInternalVisible(newVisible);
    }
  };
  
  const handleTriggerPress = () => {
    if (trigger === 'click') {
      // 测量触发器位置
      triggerRef.current?.measureInWindow((x, y, width, height) => {
        setTriggerLayout({ x, y, width, height });
        handleVisibleChange(!visible);
      });
    }
  };
  
  const getPopoverPosition = () => {
    const popoverWidth = 200 * responsiveSize;
    const popoverHeight = 100 * responsiveSize;
    const arrowSize = 8 * responsiveSize;
    
    let left = triggerLayout.x;
    let top = triggerLayout.y;
    
    switch (placement) {
      case 'top':
        left = triggerLayout.x + triggerLayout.width / 2 - popoverWidth / 2;
        top = triggerLayout.y - popoverHeight - arrowSize;
        break;
      case 'bottom':
        left = triggerLayout.x + triggerLayout.width / 2 - popoverWidth / 2;
        top = triggerLayout.y + triggerLayout.height + arrowSize;
        break;
      case 'left':
        left = triggerLayout.x - popoverWidth - arrowSize;
        top = triggerLayout.y + triggerLayout.height / 2 - popoverHeight / 2;
        break;
      case 'right':
        left = triggerLayout.x + triggerLayout.width + arrowSize;
        top = triggerLayout.y + triggerLayout.height / 2 - popoverHeight / 2;
        break;
    }
    
    // 边界检查
    left = Math.max(theme.spacing.sm * responsiveSize, Math.min(left, screenWidth - popoverWidth - theme.spacing.sm * responsiveSize));
    top = Math.max(theme.spacing.sm * responsiveSize, Math.min(top, screenHeight - popoverHeight - theme.spacing.sm * responsiveSize));
    
    return { left, top, width: popoverWidth, height: popoverHeight };
  };
  
  const popoverAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(animatedValue.value, [0, 1], [0.8, 1], Extrapolate.CLAMP);
    const opacity = interpolate(animatedValue.value, [0, 1], [0, 1], Extrapolate.CLAMP);
    
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
  
  const popoverPosition = getPopoverPosition();
  
  const popoverStyle = {
    position: 'absolute' as const,
    left: popoverPosition.left,
    top: popoverPosition.top,
    width: popoverPosition.width,
    minHeight: popoverPosition.height,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md * responsiveSize,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    padding: theme.spacing.sm * responsiveSize,
  };
  
  const titleStyle = {
    fontSize: theme.fontSize.md * responsiveSize,
    fontWeight: 'bold' as const,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs * responsiveSize,
  };
  
  const contentStyle = {
    fontSize: theme.fontSize.sm * responsiveSize,
    color: theme.colors.text,
    lineHeight: theme.fontSize.sm * responsiveSize * 1.4,
  };
  
  const maskStyle = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  };
  
  const renderArrow = () => {
    const arrowSize = 8 * responsiveSize;
    const arrowStyle = {
      position: 'absolute' as const,
      width: 0,
      height: 0,
      borderStyle: 'solid' as const,
    };
    
    switch (placement) {
      case 'top':
        return (
          <View style={[
            arrowStyle,
            {
              bottom: -arrowSize,
              left: '50%',
              marginLeft: -arrowSize,
              borderLeftWidth: arrowSize,
              borderRightWidth: arrowSize,
              borderTopWidth: arrowSize,
              borderLeftColor: 'transparent',
              borderRightColor: 'transparent',
              borderTopColor: theme.colors.background,
            },
          ]} />
        );
      case 'bottom':
        return (
          <View style={[
            arrowStyle,
            {
              top: -arrowSize,
              left: '50%',
              marginLeft: -arrowSize,
              borderLeftWidth: arrowSize,
              borderRightWidth: arrowSize,
              borderBottomWidth: arrowSize,
              borderLeftColor: 'transparent',
              borderRightColor: 'transparent',
              borderBottomColor: theme.colors.background,
            },
          ]} />
        );
      case 'left':
        return (
          <View style={[
            arrowStyle,
            {
              right: -arrowSize,
              top: '50%',
              marginTop: -arrowSize,
              borderTopWidth: arrowSize,
              borderBottomWidth: arrowSize,
              borderLeftWidth: arrowSize,
              borderTopColor: 'transparent',
              borderBottomColor: 'transparent',
              borderLeftColor: theme.colors.background,
            },
          ]} />
        );
      case 'right':
        return (
          <View style={[
            arrowStyle,
            {
              left: -arrowSize,
              top: '50%',
              marginTop: -arrowSize,
              borderTopWidth: arrowSize,
              borderBottomWidth: arrowSize,
              borderRightWidth: arrowSize,
              borderTopColor: 'transparent',
              borderBottomColor: 'transparent',
              borderRightColor: theme.colors.background,
            },
          ]} />
        );
      default:
        return null;
    }
  };
  
  return (
    <>
      <TouchableOpacity
        ref={triggerRef}
        onPress={handleTriggerPress}
        style={style}
      >
        {children}
      </TouchableOpacity>
      
      <Modal
        visible={visible}
        transparent
        animationType="none"
        onRequestClose={() => handleVisibleChange(false)}
      >
        <Animated.View style={[maskStyle, maskAnimatedStyle]}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => handleVisibleChange(false)}
            activeOpacity={1}
          />
        </Animated.View>
        
        <Animated.View style={[popoverStyle, popoverAnimatedStyle]}>
          {renderArrow()}
          {title && <View style={titleStyle}>{title}</View>}
          <View style={contentStyle}>{content}</View>
        </Animated.View>
      </Modal>
    </>
  );
};

export default Popover;