import { StyleSheet } from 'react-native';
import { Theme } from '../types';
import { pt } from '../theme/utils';

export const createEmptyStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: theme.spacing.xl,
      paddingHorizontal: theme.spacing.lg,
    },
    
    imageContainer: {
      marginBottom: theme.spacing.lg,
    },
    
    image: {
      width: pt(120),
      height: pt(120),
    },
    
    icon: {
      fontSize: pt(64),
    },
    
    title: {
      fontSize: theme.fontSizes.lg,
      fontWeight: '600',
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: theme.spacing.sm,
    },
    
    description: {
      fontSize: theme.fontSizes.md,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      lineHeight: theme.fontSizes.md * 1.5,
      marginBottom: theme.spacing.lg,
    },
    
    content: {
      alignItems: 'center',
    },
  });
};