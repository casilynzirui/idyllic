// Shim for react-native-safe-area-context
import React from 'react';

// Mock safe area insets for web
const mockInsets = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
};

const mockFrame = {
  x: 0,
  y: 0,
  width: typeof window !== 'undefined' ? window.innerWidth : 0,
  height: typeof window !== 'undefined' ? window.innerHeight : 0,
};

export const SafeAreaProvider = ({ children, ...props }: any) =>
  React.createElement('div', props, children);

export const SafeAreaView = ({ children, ...props }: any) =>
  React.createElement('div', props, children);

export const useSafeAreaInsets = () => mockInsets;

export const useSafeAreaFrame = () => mockFrame;

// Additional exports required by React Navigation
export const initialWindowMetrics = {
  insets: mockInsets,
  frame: mockFrame,
};

export const SafeAreaFrameContext = React.createContext(mockFrame);
export const SafeAreaInsetsContext = React.createContext(mockInsets);

// Hook implementations
export const withSafeAreaInsets = (Component: any) => Component;

export default {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
  useSafeAreaFrame,
  initialWindowMetrics,
  SafeAreaFrameContext,
  SafeAreaInsetsContext,
  withSafeAreaInsets,
};
