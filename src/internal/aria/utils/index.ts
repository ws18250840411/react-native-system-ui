import { I18nManager } from 'react-native';

export const getLabel = (props: any) => {
  let label = props['aria-label'];

  if (!label) {
    label = typeof props.label === 'string' ? props.label : undefined;
  }

  return label;
};

export { mapDomPropsToRN } from './ariaToAccessibilityMap';
export { mergeProps } from '@react-aria/utils';

export const isRTL = (): any => {
  if (I18nManager.isRTL !== undefined) {
    return I18nManager.isRTL;
  }

  // @ts-ignore - RN web only
  if (I18nManager.getConstants) {
    // @ts-ignore - RN web only
    return I18nManager.getConstants().isRTL;
  }
};
