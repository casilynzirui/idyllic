// Shim for react-native-swipe-gestures
import React from 'react';
import { View, PanResponder } from 'react-native';

export const GestureRecognizer = ({ children, onSwipe, onSwipeUp, onSwipeDown, onSwipeLeft, onSwipeRight, ...props }: any) => {
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: () => {},
    onPanResponderRelease: (evt, gestureState) => {
      const { dx, dy } = gestureState;
      
      if (Math.abs(dx) > Math.abs(dy)) {
        // Horizontal swipe
        if (dx > 0) {
          onSwipeRight && onSwipeRight();
          onSwipe && onSwipe('right');
        } else {
          onSwipeLeft && onSwipeLeft();
          onSwipe && onSwipe('left');
        }
      } else {
        // Vertical swipe
        if (dy > 0) {
          onSwipeDown && onSwipeDown();
          onSwipe && onSwipe('down');
        } else {
          onSwipeUp && onSwipeUp();
          onSwipe && onSwipe('up');
        }
      }
    },
  });

  return React.createElement(View, {
    ...props,
    ...panResponder.panHandlers,
  }, children);
};

export default GestureRecognizer;
