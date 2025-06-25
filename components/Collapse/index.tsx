import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { useTheme } from '../theme';
import { CollapseProps, CollapsePanelProps } from '../types';
import { getResponsiveSize } from '../utils';

export const CollapsePanel: React.FC<CollapsePanelProps & { 
  isActive: boolean;
  onPress: () => void;
}> = ({
  header,
  disabled = false,
  isActive,
  onPress,
  style,
  children,
}) => {
  const { theme } = useTheme();
  const responsiveSize = getResponsiveSize();
  const [contentHeight, setContentHeight] = useState(0);
  
  const animatedHeight = useSharedValue(isActive ? 1 : 0);
  
  React.useEffect(() => {
    animatedHeight.value = withTiming(isActive ? 1 : 0, { duration: 300 });
  }, [isActive, animatedHeight]);
  
  const animatedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      animatedHeight.value,
      [0, 1],
      [0, contentHeight],
      Extrapolate.CLAMP
    );
    
    return {
      height,
      overflow: 'hidden',
    };
  });
  
  const headerStyle = {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingHorizontal: theme.spacing.md * responsiveSize,
    paddingVertical: theme.spacing.sm * responsiveSize,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    opacity: disabled ? 0.5 : 1,
  };
  
  const headerTextStyle = {
    fontSize: theme.fontSize.md * responsiveSize,
    color: theme.colors.text,
    fontWeight: '500' as const,
    flex: 1,
  };
  
  const arrowStyle = {
    fontSize: theme.fontSize.md * responsiveSize,
    color: theme.colors.textSecondary,
    transform: [{ rotate: isActive ? '180deg' : '0deg' }],
  };
  
  const contentStyle = {
    padding: theme.spacing.md * responsiveSize,
    backgroundColor: theme.colors.background,
  };
  
  return (
    <View style={[{ marginBottom: 1 }, style]}>
      <TouchableOpacity
        style={headerStyle}
        onPress={onPress}
        disabled={disabled}
      >
        <View style={{ flex: 1 }}>
          {typeof header === 'string' ? (
            <Text style={headerTextStyle}>{header}</Text>
          ) : (
            header
          )}
        </View>
        <Text style={arrowStyle}>▼</Text>
      </TouchableOpacity>
      
      <Animated.View style={animatedStyle}>
        <View
          style={contentStyle}
          onLayout={(event) => {
            setContentHeight(event.nativeEvent.layout.height);
          }}
        >
          {children}
        </View>
      </Animated.View>
    </View>
  );
};

export const Collapse: React.FC<CollapseProps> = ({
  activeKey,
  accordion = false,
  onChange,
  style,
  children,
}) => {
  const { theme } = useTheme();
  
  const panels = React.Children.toArray(children) as React.ReactElement<CollapsePanelProps>[];
  const [internalActiveKey, setInternalActiveKey] = useState<string | string[]>(
    activeKey || (accordion ? '' : [])
  );
  
  const currentActiveKey = activeKey !== undefined ? activeKey : internalActiveKey;
  
  const handlePanelPress = (key: string) => {
    let newActiveKey: string | string[];
    
    if (accordion) {
      // 手风琴模式：只能展开一个
      newActiveKey = currentActiveKey === key ? '' : key;
    } else {
      // 普通模式：可以展开多个
      const activeKeys = Array.isArray(currentActiveKey) ? currentActiveKey : [];
      if (activeKeys.includes(key)) {
        newActiveKey = activeKeys.filter(k => k !== key);
      } else {
        newActiveKey = [...activeKeys, key];
      }
    }
    
    if (onChange) {
      onChange(newActiveKey);
    } else {
      setInternalActiveKey(newActiveKey);
    }
  };
  
  const isActive = (key: string) => {
    if (accordion) {
      return currentActiveKey === key;
    } else {
      const activeKeys = Array.isArray(currentActiveKey) ? currentActiveKey : [];
      return activeKeys.includes(key);
    }
  };
  
  const containerStyle = {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: 'hidden' as const,
  };
  
  return (
    <View style={[containerStyle, style]}>
      {panels.map((panel) => (
        <CollapsePanel
          key={panel.props.key}
          {...panel.props}
          isActive={isActive(panel.props.key)}
          onPress={() => handlePanelPress(panel.props.key)}
        />
      ))}
    </View>
  );
};

export default Collapse;