import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { useTheme } from '../theme';
import { TooltipProps } from '../types';
import { getResponsiveSize } from '../utils';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const Tooltip: React.FC<TooltipProps> = ({
  title,
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
  const hideTimer = useRef<NodeJS.Timeout | null>(null);
  
  const visible = controlledVisible !== undefined ? controlledVisible : internalVisible;
  
  const animatedValue = useSharedValue(0);
  
  React.useEffect(() => {
    animatedValue.value = withTiming(visible ? 1 : 0, { duration: 150 });
  }, [visible, animatedValue]);
  
  const handleVisibleChange = (newVisible: boolean) => {
    if (onVisibleChange) {
      onVisibleChange(newVisible);
    } else {
      setInternalVisible(newVisible);
    }
  };
  
  const showTooltip = () => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
    
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      setTriggerLayout({ x, y, width, height });
      handleVisibleChange(true);
    });
  };
  
  const hideTooltip = () => {
    hideTimer.current = setTimeout(() => {
      handleVisibleChange(false);
    }, 100);
  };
  
  const getTooltipPosition = () => {
    if (!title) return { left: 0, top: 0, width: 0, height: 0 };
    
    // 估算tooltip尺寸
    const maxWidth = 200 * responsiveSize;
    const padding = theme.spacing.sm * responsiveSize;
    const fontSize = theme.fontSize.sm * responsiveSize;
    const lineHeight = fontSize * 1.4;
    
    // 简单估算文本高度
    const textLength = title.length;
    const estimatedLines = Math.ceil((textLength * fontSize * 0.6) / (maxWidth - padding * 2));
    const tooltipHeight = estimatedLines * lineHeight + padding * 2;
    
    const arrowSize = 6 * responsiveSize;
    let left = triggerLayout.x;
    let top = triggerLayout.y;
    
    switch (placement) {
      case 'top':
        left = triggerLayout.x + triggerLayout.width / 2 - maxWidth / 2;
        top = triggerLayout.y - tooltipHeight - arrowSize;
        break;
      case 'bottom':
        left = triggerLayout.x + triggerLayout.width / 2 - maxWidth / 2;
        top = triggerLayout.y + triggerLayout.height + arrowSize;
        break;
      case 'left':
        left = triggerLayout.x - maxWidth - arrowSize;
        top = triggerLayout.y + triggerLayout.height / 2 - tooltipHeight / 2;
        break;
      case 'right':
        left = triggerLayout.x + triggerLayout.width + arrowSize;
        top = triggerLayout.y + triggerLayout.height / 2 - tooltipHeight / 2;
        break;
    }
    
    // 边界检查
    left = Math.max(theme.spacing.sm * responsiveSize, Math.min(left, screenWidth - maxWidth - theme.spacing.sm * responsiveSize));
    top = Math.max(theme.spacing.sm * responsiveSize, Math.min(top, screenHeight - tooltipHeight - theme.spacing.sm * responsiveSize));
    
    return { left, top, width: maxWidth, height: tooltipHeight };
  };
  
  const tooltipAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(animatedValue.value, [0, 1], [0.8, 1], Extrapolate.CLAMP);
    const opacity = interpolate(animatedValue.value, [0, 1], [0, 1], Extrapolate.CLAMP);
    
    return {
      transform: [{ scale }],
      opacity,
    };
  });
  
  const tooltipPosition = getTooltipPosition();
  
  const tooltipStyle = {
    position: 'absolute' as const,
    left: tooltipPosition.left,
    top: tooltipPosition.top,
    maxWidth: tooltipPosition.width,
    backgroundColor: theme.colors.dark,
    borderRadius: theme.borderRadius.sm * responsiveSize,
    paddingHorizontal: theme.spacing.sm * responsiveSize,
    paddingVertical: theme.spacing.xs * responsiveSize,
    shadowColor: theme.colors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  };
  
  const tooltipTextStyle = {
    fontSize: theme.fontSize.sm * responsiveSize,
    color: theme.colors.background,
    lineHeight: theme.fontSize.sm * responsiveSize * 1.4,
    textAlign: 'center' as const,
  };
  
  const renderArrow = () => {
    const arrowSize = 6 * responsiveSize;
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
              borderTopColor: theme.colors.dark,
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
              borderBottomColor: theme.colors.dark,
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
              borderLeftColor: theme.colors.dark,
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
              borderRightColor: theme.colors.dark,
            },
          ]} />
        );
      default:
        return null;
    }
  };
  
  if (!title) {
    return <View style={style}>{children}</View>;
  }
  
  return (
    <>
      <TouchableOpacity
        ref={triggerRef}
        onPressIn={showTooltip}
        onPressOut={hideTooltip}
        style={style}
        activeOpacity={1}
      >
        {children}
      </TouchableOpacity>
      
      <Modal
        visible={visible}
        transparent
        animationType="none"
        pointerEvents="none"
      >
        <Animated.View style={[tooltipStyle, tooltipAnimatedStyle]}>
          {renderArrow()}
          <Text style={tooltipTextStyle}>{title}</Text>
        </Animated.View>
      </Modal>
    </>
  );
};

export default Tooltip;