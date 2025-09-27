// Comprehensive shim for @shopify/react-native-skia
import React from 'react';
import { View, Text } from 'react-native';

// Canvas component
export const Canvas = ({ children, ...props }: any) => (
  <View {...props} style={[{ backgroundColor: '#f0f0f0', borderRadius: 8 }, props.style]}>
    <Text style={{ textAlign: 'center', padding: 20, color: '#666' }}>
      Canvas (Web Preview)
    </Text>
    {children}
  </View>
);

// Basic shapes
export const Rect = ({ ...props }: any) => (
  <View style={{
    width: props.width || 50,
    height: props.height || 50,
    backgroundColor: props.color || '#A2AB9B',
    margin: 5,
  }} />
);

export const Circle = ({ ...props }: any) => (
  <View style={{
    width: props.r ? props.r * 2 : 50,
    height: props.r ? props.r * 2 : 50,
    borderRadius: props.r || 25,
    backgroundColor: props.color || '#A2AB9B',
    margin: 5,
  }} />
);

export const Path = ({ ...props }: any) => (
  <View style={{
    width: 50,
    height: 50,
    backgroundColor: props.color || '#A2AB9B',
    margin: 5,
    borderRadius: 5,
  }} />
);

// Group component
export const Group = ({ children, ...props }: any) => (
  <View {...props}>
    {children}
  </View>
);

// Hooks and utilities
export const useValue = (initialValue: any) => ({ current: initialValue });
export const useComputedValue = (fn: any, deps: any[]) => ({ current: fn() });
export const useTouchHandler = (handlers: any) => ({});
export const useSharedValueEffect = (fn: any, value: any) => {};

// Skia utilities
export const Skia = {
  Path: {
    Make: () => ({
      moveTo: () => {},
      lineTo: () => {},
      close: () => {},
    }),
  },
  Paint: () => ({
    setColor: () => {},
    setStyle: () => {},
  }),
};

// Animation
export const runSpring = (value: any, config: any) => {};
export const runTiming = (value: any, config: any) => {};

export default {
  Canvas,
  Rect,
  Circle,
  Path,
  Group,
  useValue,
  useComputedValue,
  useTouchHandler,
  useSharedValueEffect,
  Skia,
  runSpring,
  runTiming,
};