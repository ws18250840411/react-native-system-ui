import React, { memo } from 'react';
import { Text } from 'react-native';
import { IconProps } from '../types';
import { useTheme } from '../theme';
import { createIconStyles } from './styles';
import { iconMap } from './iconMap';

export const Icon: React.FC<IconProps> = memo(({
  name,
  size,
  color,
  style,
  testID,
  ...rest
}) => {
  const theme = useTheme();
  const styles = createIconStyles(theme);
  
  const iconSize = size || 20;
  const iconColor = color || theme.colors.text;
  const iconCode = iconMap[name] || '?';

  const iconStyle = [
    styles.icon,
    {
      fontSize: iconSize,
      color: iconColor,
    },
    style,
  ];

  return (
    <Text
      style={iconStyle}
      testID={testID}
      {...rest}
    >
      {iconCode}
    </Text>
  );
});

Icon.displayName = 'Icon';