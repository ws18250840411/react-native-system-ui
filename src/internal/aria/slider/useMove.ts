

import React, { useState } from 'react';
import { PanResponder } from 'react-native';

interface MoveResult {
  
  moveProps: any;
}


export function useMove(props: any): MoveResult {
  let { onMoveStart, onMove, onMoveEnd } = props;

  const [initialMoveX, setInitialMoveX] = useState(0);
  const [initialMoveY, setInitialMoveY] = useState(0);
  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponderCapture: (_event) => {
          return true;
        },
        onPanResponderGrant: (_evt, gestureState) => {
          onMoveStart?.({
            type: 'movestart',
            pointerType: 'touch',
          });
          setInitialMoveX(gestureState.moveX);
          setInitialMoveY(gestureState.moveY);
        },
        onPanResponderMove: (_event, gestureState) => {
          const deltaX = gestureState.moveX - initialMoveX;
          const deltaY = gestureState.moveY - initialMoveY;
          if (deltaX === 0 && deltaY === 0) {
            return;
          }

          if (deltaX) {
            onMove({
              type: 'move',
              pointerType: 'touch',
              deltaX: deltaX,
              deltaY: deltaY,
            });
          }
        },
        onPanResponderRelease: () => {
          onMoveEnd?.({
            type: 'moveend',
            pointerType: 'touch',
          });
        },
      }),
    [onMove, onMoveEnd, onMoveStart, initialMoveX, initialMoveY]
  );

  return { moveProps: panResponder.panHandlers };
}
