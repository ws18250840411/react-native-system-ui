import React, { useMemo } from 'react';
import { Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { IconProps } from '../types';
import { responsive } from '../utils';

// 简单的图标映射
const ICON_MAP: Record<string, string> = {
  'home': '🏠',
  'user': '👤',
  'settings': '⚙️',
  'search': '🔍',
  'heart': '❤️',
  'star': '⭐',
  'plus': '➕',
  'minus': '➖',
  'check': '✅',
  'close': '❌',
  'arrow-left': '←',
  'arrow-right': '→',
  'arrow-up': '↑',
  'arrow-down': '↓',
};

// 获取图标字符的函数
const getIconChar = (name: string): string => {
  return ICON_MAP[name] || '❓';
};



const Icon: React.FC<IconProps> = ({
  name,
  size = 20,
  color,
  onPress,
  style,
  children,
}) => {
  const { theme } = useTheme();

  // 计算样式
  const styles = useMemo(() => {
    const iconSize = responsive(size);
    const iconColor = color || theme.colors.text;

    const containerStyle: ViewStyle = {
      justifyContent: 'center',
      alignItems: 'center',
      width: iconSize,
      height: iconSize,
    };

    const iconStyle: TextStyle = {
      fontSize: iconSize * 0.8, // 图标稍小于容器
      color: iconColor,
      textAlign: 'center',
      lineHeight: iconSize,
    };

    return { containerStyle, iconStyle };
  }, [size, color, theme]);

  // 处理点击事件
  const handlePress = React.useCallback(() => {
    if (onPress) {
      onPress();
    }
  }, [onPress]);

  // 获取图标字符
  const iconChar = getIconChar(name);

  // 渲染内容
  const renderContent = () => {
    if (children) {
      return children;
    }
    
    return (
      <Text style={styles.iconStyle}>
        {iconChar}
      </Text>
    );
  };

  // 如果有点击事件，使用TouchableOpacity包装
  if (onPress) {
    return (
      <TouchableOpacity
        style={[styles.containerStyle, style]}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        {renderContent()}
      </TouchableOpacity>
    );
  }

  // 否则直接渲染
  return (
    <View style={[styles.containerStyle, style]}>
      {renderContent()}
    </View>
  );
};

export default React.memo(Icon);

// 导出图标名称和映射
export const iconNames = Object.keys(ICON_MAP);
export { ICON_MAP as iconMap };
