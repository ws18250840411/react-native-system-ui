import { StyleSheet } from 'react-native';
import { Theme, ColorType } from '../types';

const isCustomColor = (color: string | ColorType): color is string => {
  return typeof color === 'string' && !['primary', 'secondary', 'success', 'warning', 'danger', 'info'].includes(color);
};

const getColorValue = (theme: Theme, color: string | ColorType): string => {
  if (isCustomColor(color)) {
    return color;
  }
  return theme.colors[color as ColorType];
};

export const createButtonStyles = (theme: Theme, color: string | ColorType = 'primary', plain: boolean = false) =>
  StyleSheet.create({
    base: {
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: 'transparent',
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    // 变体样式
    filled: {
      borderWidth: 0,
    },
    outlined: {
      backgroundColor: 'transparent',
    },
    text: {
      backgroundColor: 'transparent',
      borderWidth: 0,
    },
    ghost: {
      backgroundColor: 'transparent',
      borderWidth: 0,
    },

    // 颜色样式 - filled
    filled_primary: {
      backgroundColor: getColorValue(theme, 'primary'),
    },
    filled_secondary: {
      backgroundColor: getColorValue(theme, 'secondary'),
    },
    filled_success: {
      backgroundColor: getColorValue(theme, 'success'),
    },
    filled_warning: {
      backgroundColor: getColorValue(theme, 'warning'),
    },
    filled_danger: {
      backgroundColor: getColorValue(theme, 'danger'),
    },
    filled_info: {
      backgroundColor: getColorValue(theme, 'info'),
    },
    // 自定义颜色支持
    ...(isCustomColor(color) ? {
      [`filled_${color}`]: {
        backgroundColor: color,
      }
    } : {}),

    // 颜色样式 - outlined
    outlined_primary: {
      borderColor: getColorValue(theme, 'primary'),
    },
    outlined_secondary: {
      borderColor: getColorValue(theme, 'secondary'),
    },
    outlined_success: {
      borderColor: getColorValue(theme, 'success'),
    },
    outlined_warning: {
      borderColor: getColorValue(theme, 'warning'),
    },
    outlined_danger: {
      borderColor: getColorValue(theme, 'danger'),
    },
    outlined_info: {
      borderColor: getColorValue(theme, 'info'),
    },
    // 自定义颜色支持
    ...(isCustomColor(color) ? {
      [`outlined_${color}`]: {
        borderColor: color,
      }
    } : {}),

    // Plain 模式样式
    plain_filled: {
      backgroundColor: theme.colors.white,
      borderWidth: 1,
    },
    plain_outlined: {
      backgroundColor: theme.colors.white,
      borderWidth: 1,
    },
    plain_text: {
      backgroundColor: 'transparent',
      borderWidth: 0,
    },
    plain_ghost: {
      backgroundColor: 'transparent',
      borderWidth: 0,
    },

    // Plain 模式颜色样式
    plain_filled_primary: {
      borderColor: getColorValue(theme, 'primary'),
    },
    plain_filled_secondary: {
      borderColor: getColorValue(theme, 'secondary'),
    },
    plain_filled_success: {
      borderColor: getColorValue(theme, 'success'),
    },
    plain_filled_warning: {
      borderColor: getColorValue(theme, 'warning'),
    },
    plain_filled_danger: {
      borderColor: getColorValue(theme, 'danger'),
    },
    plain_filled_info: {
      borderColor: getColorValue(theme, 'info'),
    },
    plain_outlined_primary: {
      borderColor: getColorValue(theme, 'primary'),
    },
    plain_outlined_secondary: {
      borderColor: getColorValue(theme, 'secondary'),
    },
    plain_outlined_success: {
      borderColor: getColorValue(theme, 'success'),
    },
    plain_outlined_warning: {
      borderColor: getColorValue(theme, 'warning'),
    },
    plain_outlined_danger: {
      borderColor: getColorValue(theme, 'danger'),
    },
    plain_outlined_info: {
      borderColor: getColorValue(theme, 'info'),
    },
    // 自定义颜色的 plain 模式
    ...(isCustomColor(color) ? {
      [`plain_filled_${color}`]: {
        borderColor: color,
      },
      [`plain_outlined_${color}`]: {
        borderColor: color,
      }
    } : {}),

    // 尺寸样式
    small: {
      height: 32,
      paddingHorizontal: theme.spacing.sm,
      borderRadius: theme.borderRadius.sm,
    },
    medium: {
      height: 40,
      paddingHorizontal: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
    },
    large: {
      height: 48,
      paddingHorizontal: theme.spacing.lg,
      borderRadius: theme.borderRadius.lg,
    },

    // 形状样式
    square: {
      borderRadius: theme.borderRadius.xs,
    },
    round: {
      // 使用默认的borderRadius
    },

    // 块级样式
    block: {
      width: '100%',
    },

    // 禁用样式
    disabled: {
      opacity: 0.5,
    },

    // 文本样式
    textBase: {
      fontWeight: '500',
    },
    text_filled: {
      color: theme.colors.white,
    },
    text_outlined: {
      // 颜色由具体的颜色类决定
    },
    text_text: {
      // 颜色由具体的颜色类决定
    },
    text_ghost: {
      // 颜色由具体的颜色类决定
    },

    // 文本颜色 - outlined/text/ghost
    text_outlined_primary: {
      color: theme.colors.primary,
    },
    text_outlined_secondary: {
      color: theme.colors.secondary,
    },
    text_outlined_success: {
      color: theme.colors.success,
    },
    text_outlined_warning: {
      color: theme.colors.warning,
    },
    text_outlined_danger: {
      color: theme.colors.danger,
    },
    text_outlined_info: {
      color: theme.colors.info,
    },
    text_text_primary: {
      color: theme.colors.primary,
    },
    text_text_secondary: {
      color: theme.colors.secondary,
    },
    text_text_success: {
      color: theme.colors.success,
    },
    text_text_warning: {
      color: theme.colors.warning,
    },
    text_text_danger: {
      color: theme.colors.danger,
    },
    text_text_info: {
      color: theme.colors.info,
    },
    text_ghost_primary: {
      color: theme.colors.primary,
    },
    text_ghost_secondary: {
      color: theme.colors.secondary,
    },
    text_ghost_success: {
      color: theme.colors.success,
    },
    text_ghost_warning: {
      color: theme.colors.warning,
    },
    text_ghost_danger: {
      color: theme.colors.danger,
    },
    text_ghost_info: {
      color: theme.colors.info,
    },

    // 文本尺寸
    text_small: {
      fontSize: theme.fontSizes.xs,
    },
    text_medium: {
      fontSize: theme.fontSizes.sm,
    },
    text_large: {
      fontSize: theme.fontSizes.md,
    },

    // Plain 模式文本颜色
    text_plain_filled_primary: {
      color: getColorValue(theme, 'primary'),
    },
    text_plain_filled_secondary: {
      color: getColorValue(theme, 'secondary'),
    },
    text_plain_filled_success: {
      color: getColorValue(theme, 'success'),
    },
    text_plain_filled_warning: {
      color: getColorValue(theme, 'warning'),
    },
    text_plain_filled_danger: {
      color: getColorValue(theme, 'danger'),
    },
    text_plain_filled_info: {
      color: getColorValue(theme, 'info'),
    },
    text_plain_outlined_primary: {
      color: getColorValue(theme, 'primary'),
    },
    text_plain_outlined_secondary: {
      color: getColorValue(theme, 'secondary'),
    },
    text_plain_outlined_success: {
      color: getColorValue(theme, 'success'),
    },
    text_plain_outlined_warning: {
      color: getColorValue(theme, 'warning'),
    },
    text_plain_outlined_danger: {
      color: getColorValue(theme, 'danger'),
    },
    text_plain_outlined_info: {
      color: getColorValue(theme, 'info'),
    },
    text_plain_text_primary: {
      color: getColorValue(theme, 'primary'),
    },
    text_plain_text_secondary: {
      color: getColorValue(theme, 'secondary'),
    },
    text_plain_text_success: {
      color: getColorValue(theme, 'success'),
    },
    text_plain_text_warning: {
      color: getColorValue(theme, 'warning'),
    },
    text_plain_text_danger: {
      color: getColorValue(theme, 'danger'),
    },
    text_plain_text_info: {
      color: getColorValue(theme, 'info'),
    },
    text_plain_ghost_primary: {
      color: getColorValue(theme, 'primary'),
    },
    text_plain_ghost_secondary: {
      color: getColorValue(theme, 'secondary'),
    },
    text_plain_ghost_success: {
      color: getColorValue(theme, 'success'),
    },
    text_plain_ghost_warning: {
      color: getColorValue(theme, 'warning'),
    },
    text_plain_ghost_danger: {
      color: getColorValue(theme, 'danger'),
    },
    text_plain_ghost_info: {
      color: getColorValue(theme, 'info'),
    },
    // 自定义颜色的 plain 模式文本
    ...(isCustomColor(color) ? {
      [`text_plain_filled_${color}`]: {
        color: color,
      },
      [`text_plain_outlined_${color}`]: {
        color: color,
      },
      [`text_plain_text_${color}`]: {
        color: color,
      },
      [`text_plain_ghost_${color}`]: {
        color: color,
      }
    } : {}),

    // 按压状态样式
    filled_pressed: {
      opacity: 0.8,
    },
    outlined_pressed: {
      backgroundColor: 'rgba(0,0,0,0.05)',
    },
    text_pressed: {
      backgroundColor: 'rgba(0,0,0,0.05)',
    },
    ghost_pressed: {
      backgroundColor: 'rgba(0,0,0,0.05)',
    },

    // 禁用文本
    textDisabled: {
      color: theme.colors.disabled,
    },

    // 图标样式
    iconLeft: {
      marginRight: theme.spacing.xs,
    },
    iconRight: {
      marginLeft: theme.spacing.xs,
    },
    loadingIcon: {
      marginRight: theme.spacing.xs,
    },
  });