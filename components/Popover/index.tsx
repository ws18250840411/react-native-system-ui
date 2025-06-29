import React, { useRef, useState } from 'react';
import { Dimensions, Modal, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../theme/ThemeProvider';
import { PopoverProps } from '../types';
import { responsive } from '../utils';

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
  const { colors, spacing, borderRadius, fontSize } = theme;
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
    const popoverWidth = responsive(200);
    const popoverHeight = responsive(100);
    const arrowSize = responsive(8);
    
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
    left = Math.max(spacing.sm * responsive(1), Math.min(left, screenWidth - popoverWidth - spacing.sm * responsive(1)));
    top = Math.max(spacing.sm * responsive(1), Math.min(top, screenHeight - popoverHeight - spacing.sm * responsive(1)));
    
    return { left, top, width: popoverWidth, height: popoverHeight };
  };
  
  const popoverAnimatedStyle = useAnimatedStyle(() => {
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
  
  const popoverPosition = getPopoverPosition();
  
  const popoverStyle = {
    position: 'absolute' as const,
    left: popoverPosition.left,
    top: popoverPosition.top,
    width: popoverPosition.width,
    minHeight: popoverPosition.height,
    backgroundColor: colors.background,
    borderRadius: borderRadius.md * responsive(1),
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    padding: spacing.sm * responsive(1),
  };
  
  const titleStyle = {
    fontSize: fontSize.md * responsive(1),
    fontWeight: 'bold' as const,
    color: colors.text,
    marginBottom: spacing.xs * responsive(1),
  };
  
  const contentStyle = {
    fontSize: fontSize.sm * responsive(1),
    color: colors.text,
    lineHeight: fontSize.sm * responsive(1) * 1.4,
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
    const arrowSize = responsive(8);
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
              borderTopColor: colors.background,
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
              borderBottomColor: colors.background,
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
              borderLeftColor: colors.background,
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
              borderRightColor: colors.background,
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
          <Text style={contentStyle}>{content}</Text>
        </Animated.View>
      </Modal>
    </>
  );
};

export default Popover;