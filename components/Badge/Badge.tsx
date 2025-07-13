import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { BadgeProps } from '../types';
import { useTheme } from '../theme';
import { createBadgeStyles } from './styles';

export const Badge: React.FC<BadgeProps> = memo(({
  count = 0,
  max = 99,
  dot = false,
  showZero = false,
  color,
  textColor,
  size = 'md',
  offset,
  children,
  style,
  testID,
  ...rest
}) => {
  const theme = useTheme();
  const styles = createBadgeStyles(theme, size);
  
  const badgeColor = color || theme.colors.danger;
  const badgeTextColor = textColor || theme.colors.background;
  
  const shouldShow = dot || count > 0 || (count === 0 && showZero);
  
  const getDisplayText = () => {
    if (dot) return '';
    if (count > max) return `${max}+`;
    return count.toString();
  };
  
  const badgeStyle = [
    styles.badge,
    dot ? styles.dot : styles.count,
    { backgroundColor: badgeColor },
    offset && {
      top: offset[1],
      right: -offset[0],
    },
    style,
  ];
  
  const textStyle = [
    styles.text,
    { color: badgeTextColor },
  ];
  
  if (!children) {
    // 独立显示的徽章
    if (!shouldShow) return null;
    
    return (
      <View style={badgeStyle} testID={testID} {...rest}>
        {!dot && (
          <Text style={textStyle}>
            {getDisplayText()}
          </Text>
        )}
      </View>
    );
  }
  
  // 包装子组件的徽章
  return (
    <View style={styles.container}>
      {children}
      {shouldShow && (
        <View style={[badgeStyle, styles.absolute]} testID={testID} {...rest}>
          {!dot && (
            <Text style={textStyle}>
              {getDisplayText()}
            </Text>
          )}
        </View>
      )}
    </View>
  );
});

Badge.displayName = 'Badge';