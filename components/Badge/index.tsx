import React, { useMemo } from 'react';
import {
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { BadgeProps } from '../types';
import { responsive } from '../utils';

const Badge: React.FC<BadgeProps> = ({
  count = 0,
  dot = false,
  max = 99,
  showZero = false,
  children,
  style,
}) => {
  const { theme } = useTheme();

  // 计算显示的数字
  const displayCount = useMemo(() => {
    if (dot) return '';
    if (count === 0 && !showZero) return '';
    if (count > max) return `${max}+`;
    return count.toString();
  }, [count, dot, max, showZero]);

  // 判断是否显示徽章
  const shouldShow = useMemo(() => {
    if (dot) return true;
    if (count === 0 && !showZero) return false;
    return count > 0;
  }, [count, dot, showZero]);

  // 计算样式
  const styles = useMemo(() => {
    const badgeSize = dot ? responsive(8) : responsive(16);
    const minWidth = dot ? badgeSize : responsive(16);
    
    const containerStyle: ViewStyle = {
      position: 'relative',
    };

    const badgeStyle: ViewStyle = {
      position: 'absolute',
      top: -badgeSize / 2,
      right: -badgeSize / 2,
      backgroundColor: theme.colors.danger,
      borderRadius: badgeSize / 2,
      minWidth,
      height: badgeSize,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: dot ? 0 : theme.spacing.xs / 2,
      borderWidth: 1,
      borderColor: theme.colors.background,
      zIndex: 1,
    };

    const textStyle: TextStyle = {
      fontSize: responsive(10),
      fontWeight: '600',
      color: '#FFFFFF',
      textAlign: 'center',
      lineHeight: responsive(12),
    };

    return {
      containerStyle,
      badgeStyle,
      textStyle,
    };
  }, [theme, dot]);

  // 如果没有子元素，直接渲染徽章
  if (!children) {
    if (!shouldShow) return null;
    
    return (
      <View style={[styles.badgeStyle, { position: 'relative', top: 0, right: 0 }, style]}>
        {!dot && displayCount && (
          <Text style={styles.textStyle}>
            {displayCount}
          </Text>
        )}
      </View>
    );
  }

  // 有子元素时，作为容器渲染
  return (
    <View style={[styles.containerStyle, style]}>
      {children}
      {shouldShow && (
        <View style={styles.badgeStyle}>
          {!dot && displayCount && (
            <Text style={styles.textStyle}>
              {displayCount}
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

export default React.memo(Badge);