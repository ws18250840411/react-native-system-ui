// @ts-nocheck
import { sliderIds } from './utils';
import { AriaSliderProps } from '@react-types/slider';
import React, { useRef } from 'react';
import { SliderState } from '@react-stately/slider';
import { useLabel } from '@react-aria/label';
import { isRTL } from '../utils';

interface SliderAria {
  
  labelProps: any;

  
  groupProps: any;

  
  trackProps: any;

  
  outputProps: any;
}


export function useSlider(
  props: AriaSliderProps,
  state: SliderState,
  trackLayout: any,
  isReversed?: boolean
): SliderAria {
  let { labelProps, fieldProps } = useLabel(props);

  let isVertical = props.orientation === 'vertical';

  sliderIds.set(state, labelProps.id ?? fieldProps.id);
  let currentPointer = useRef<number | null | undefined>(undefined);

  let onDownTrack = (
    e: React.UIEvent,
    id: number,
    clientX: number,
    clientY: number
  ) => {
    const direction = isRTL() ? 'rtl' : undefined;
    const reverseX = isReversed || direction === 'rtl';
    if (
      !props.isDisabled &&
      state.values.every((_, i) => !state.isThumbDragging(i))
    ) {
      let size = isVertical ? trackLayout.height : trackLayout.width;
      const trackPosition = trackLayout[isVertical ? 'y' : 'x'];
      const clickPosition = isVertical ? clientY : clientX;
      const offset = clickPosition - trackPosition;
      let percent = offset / size;
      if (reverseX) {
        if (!isVertical) {
          percent = 1 - percent;
        }
      } else {
        if (isVertical) {
          percent = 1 - percent;
        }
      }
      let value = state.getPercentValue(percent);
      let closestThumb;
      let split = state.values.findIndex((v) => value - v < 0);
      if (split === 0) {
        closestThumb = split;
      } else if (split === -1) {
        closestThumb = state.values.length - 1;
      } else {
        let lastLeft = state.values[split - 1];
        let firstRight = state.values[split];
        if (Math.abs(lastLeft - value) < Math.abs(firstRight - value)) {
          closestThumb = split - 1;
        } else {
          closestThumb = split;
        }
      }
      if (closestThumb >= 0 && state.isThumbEditable(closestThumb)) {
        e.preventDefault();
        state.setFocusedThumb(closestThumb);
        currentPointer.current = id;
        state.setThumbDragging(closestThumb, true);
        state.setThumbValue(closestThumb, value);
        state.setThumbDragging(closestThumb, false);
      }
    }
  };

  return {
    labelProps,
    groupProps: {},
    trackProps: {
      onPress: (e: any) => {
        const { locationX, locationY } = e.nativeEvent;
        onDownTrack(e, undefined, locationX, locationY);
      },
    },
    outputProps: {},
  };
}
