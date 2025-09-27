// Comprehensive shim for react-native-gesture-handler
import React from 'react';
import { TouchableOpacity, View, ScrollView, FlatList } from 'react-native';

// Gesture Handler Components
export const GestureHandlerRootView = ({ children, ...props }: any) =>
  React.createElement(View, props, children);

export const TapGestureHandler = ({ children, onHandlerStateChange, ...props }: any) =>
  React.createElement(TouchableOpacity, {
    ...props,
    onPress: () => onHandlerStateChange && onHandlerStateChange({ nativeEvent: { state: 4 } })
  }, children);

export const PanGestureHandler = ({ children, ...props }: any) =>
  React.createElement(View, props, children);

export const PinchGestureHandler = ({ children, ...props }: any) =>
  React.createElement(View, props, children);

export const RotationGestureHandler = ({ children, ...props }: any) =>
  React.createElement(View, props, children);

export const LongPressGestureHandler = ({ children, ...props }: any) =>
  React.createElement(TouchableOpacity, props, children);

export const FlingGestureHandler = ({ children, ...props }: any) =>
  React.createElement(View, props, children);

// Touchables
export const TouchableHighlight = TouchableOpacity;
export const TouchableNativeFeedback = TouchableOpacity;
export const TouchableWithoutFeedback = TouchableOpacity;

// Scrollables
export const ScrollView as any = ScrollView;
export const FlatList as any = FlatList;

// Swipe gesture handler
export const Swipe = {
  DIRECTION_LEFT: 1,
  DIRECTION_RIGHT: 2,
  DIRECTION_UP: 4,
  DIRECTION_DOWN: 8,
};

// State constants
export const State = {
  UNDETERMINED: 0,
  FAILED: 1,
  BEGAN: 2,
  CANCELLED: 3,
  ACTIVE: 4,
  END: 5,
};

// Direction constants
export const Directions = {
  RIGHT: 1,
  LEFT: 2,
  UP: 4,
  DOWN: 8,
};

// Gesture handler hook
export const useGestureHandler = (handlers: any) => ({
  onGestureEvent: () => {},
  onHandlerStateChange: () => {},
});

export default {
  GestureHandlerRootView,
  TapGestureHandler,
  PanGestureHandler,
  PinchGestureHandler,
  RotationGestureHandler,
  LongPressGestureHandler,
  FlingGestureHandler,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  ScrollView,
  FlatList,
  Swipe,
  State,
  Directions,
  useGestureHandler,
};