import { StyleSheet } from 'react-native';
import { Theme } from '../types';
import { pt } from '../theme/utils';

export const createInputStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.md,
      backgroundColor: theme.colors.background,
      paddingHorizontal: theme.spacing.md,
      minHeight: pt(48),
    },
    
    focused: {
      borderColor: theme.colors.primary,
      shadowColor: theme.colors.primary,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 2,
    },
    
    error: {
      borderColor: theme.colors.danger,
    },
    
    disabled: {
      backgroundColor: theme.colors.backgroundSecondary,
      borderColor: theme.colors.borderLight,
    },
    
    input: {
      flex: 1,
      fontSize: theme.fontSizes.md,
      color: theme.colors.text,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: 0,
    },
    
    multilineInput: {
      minHeight: pt(80),
      textAlignVertical: 'top',
    },
    
    inputDisabled: {
      color: theme.colors.textSecondary,
    },
    
    inputError: {
      color: theme.colors.danger,
    },
    
    leftIcon: {
      marginRight: theme.spacing.sm,
    },
    
    rightIcon: {
      marginLeft: theme.spacing.sm,
    },
    
    clearButton: {
      padding: theme.spacing.xs,
      marginLeft: theme.spacing.xs,
    },
    
    labelContainer: {
      marginBottom: theme.spacing.xs,
    },
    
    label: {
      fontSize: theme.fontSizes.sm,
      color: theme.colors.text,
      fontWeight: '500',
    },
    
    required: {
      color: theme.colors.danger,
    },
    
    errorText: {
      fontSize: theme.fontSizes.xs,
      color: theme.colors.danger,
      marginTop: theme.spacing.xs,
    },
  });
};