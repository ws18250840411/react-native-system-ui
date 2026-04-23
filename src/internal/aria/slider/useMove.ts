

import React, { useRef } from 'react';
import { PanResponder } from 'react-native';

interface MoveResult {
  
  moveProps: any;
}


export function useMove(props: any): MoveResult {
  let { onMoveStart, onMove, onMoveEnd } = props;

  const initialMove = useRef({ x: 0, y: 0 });
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
          initialMove.current = { x: gestureState.moveX, y: gestureState.moveY };
        },
        onPanResponderMove: (_event, gestureState) => {
          const deltaX = gestureState.moveX - initialMove.current.x;
          const deltaY = gestureState.moveY - initialMove.current.y;
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
    [onMove, onMoveEnd, onMoveStart]
  );

  return { moveProps: panResponder.panHandlers };
}
