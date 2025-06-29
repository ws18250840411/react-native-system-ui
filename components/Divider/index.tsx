import React, { useMemo } from 'react';
import {
  View,
  ViewStyle
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { DividerProps } from '../types';
import { responsive } from '../utils';

const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  dashed = false,
  style,
  children,
}) => {
  const { theme } = useTheme();

  // 计算样式
  const styles = useMemo(() => {
    const isHorizontal = orientation === 'horizontal';
    
    const dividerStyle: ViewStyle = {
      backgroundColor: theme.colors.border,
      ...(isHorizontal ? {
        height: responsive(1),
        width: '100%',
      } : {
        width: responsive(1),
        height: '100%',
      }),
      ...(dashed && {
        borderStyle: 'dashed',
        borderWidth: responsive(1),
        borderColor: theme.colors.border,
        backgroundColor: 'transparent',
        ...(isHorizontal ? {
          borderTopWidth: responsive(1),
          borderBottomWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          height: 0,
        } : {
          borderLeftWidth: responsive(1),
          borderRightWidth: 0,
          borderTopWidth: 0,
          borderBottomWidth: 0,
          width: 0,
        }),
      }),
    };

    return { dividerStyle };
  }, [theme, orientation, dashed]);

  return (
    <View style={[styles.dividerStyle, style]}>
      {children}
    </View>
  );
};

export default React.memo(Divider);