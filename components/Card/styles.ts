import { StyleSheet } from 'react-native';
import { Theme } from '../types';
import { pt } from '../theme/utils';

export const createCardStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      borderRadius: theme.borderRadius.lg,
      borderWidth: 1,
      borderColor: theme.colors.border,
      overflow: 'hidden',
    },
    
    shadow: {
      shadowColor: theme.colors.text,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    
    disabled: {
      opacity: 0.6,
    },
    
    image: {
      width: '100%',
      height: pt(200),
    },
    
    header: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      padding: theme.spacing.lg,
      paddingBottom: theme.spacing.sm,
    },
    
    headerContent: {
      flex: 1,
      marginRight: theme.spacing.sm,
    },
    
    headerExtra: {
      flexShrink: 0,
    },
    
    title: {
      fontSize: theme.fontSizes.lg,
      fontWeight: '600',
      color: theme.colors.text,
      lineHeight: theme.fontSizes.lg * 1.4,
      marginBottom: theme.spacing.xs,
    },
    
    subtitle: {
      fontSize: theme.fontSizes.sm,
      color: theme.colors.textSecondary,
      lineHeight: theme.fontSizes.sm * 1.4,
    },
    
    body: {
      paddingHorizontal: theme.spacing.lg,
      paddingBottom: theme.spacing.sm,
    },
    
    description: {
      fontSize: theme.fontSizes.md,
      color: theme.colors.text,
      lineHeight: theme.fontSizes.md * 1.5,
    },
    
    footer: {
      padding: theme.spacing.lg,
      paddingTop: theme.spacing.sm,
      borderTopWidth: 1,
      borderTopColor: theme.colors.borderLight,
    },
  });
};