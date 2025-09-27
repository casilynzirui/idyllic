// Comprehensive shim for @react-navigation/native hooks and components
import React, { useEffect, useContext, createContext } from 'react';

// Create mock contexts
export const NavigationContext = createContext<any>(null);
export const NavigationRouteContext = createContext<any>(null);

// Mock theme
const mockTheme = {
  dark: false,
  colors: {
    primary: '#A2AB9B',
    background: '#FAFAFA',
    card: '#FFFFFF',
    text: '#6E6F67',
    border: '#E5DCCC',
    notification: '#A2AB9B',
  },
};

// Mock navigation object
const createMockNavigation = () => ({
  navigate: (screen: string, params?: any) => {
    console.log('🧭 Mock navigation to:', screen, params);
  },
  goBack: () => console.log('🧭 Mock goBack'),
  push: (screen: string, params?: any) => console.log('🧭 Mock push:', screen, params),
  pop: () => console.log('🧭 Mock pop'),
  popToTop: () => console.log('🧭 Mock popToTop'),
  reset: () => console.log('🧭 Mock reset'),
  setParams: (params: any) => console.log('🧭 Mock setParams:', params),
  dispatch: (action: any) => console.log('🧭 Mock dispatch:', action),
  setOptions: (options: any) => console.log('🧭 Mock setOptions:', options),
  isFocused: () => true,
  canGoBack: () => false,
  getId: () => 'mock-screen',
  getParent: () => null,
  getState: () => ({ index: 0, routes: [] }),
});

// Navigation hooks
export const useNavigation = () => {
  const navigation = useContext(NavigationContext);
  if (!navigation) {
    console.log('🔍 useNavigation: Creating mock navigation object');
    return createMockNavigation();
  }
  return navigation;
};

export const useRoute = () => ({
  key: 'mock-route',
  name: 'MockScreen',
  params: {},
});

export const useFocusEffect = (callback: () => void | (() => void)) => {
  useEffect(() => {
    console.log('🔍 useFocusEffect: Simulating focus effect');
    const cleanup = callback();
    return cleanup;
  }, [callback]);
};

export const useIsFocused = () => true;

export const useNavigationState = (selector: any) => selector({ index: 0, routes: [] });

export const useTheme = () => mockTheme;

export const useLinkBuilder = () => ({
  buildHref: (name: string, params?: any) => `#${name}${params ? '?' + new URLSearchParams(params).toString() : ''}`,
});

// Navigation Container component
export const NavigationContainer = ({ children, ...props }: any) => {
  const mockNavigation = createMockNavigation();
  const mockRoute = useRoute();
  
  console.log('🧭 NavigationContainer: Providing mock navigation context');
  
  return React.createElement(
    NavigationContext.Provider,
    { value: mockNavigation },
    React.createElement(
      NavigationRouteContext.Provider,
      { value: mockRoute },
      React.createElement('div', { ...props, style: { flex: 1, ...props.style } }, children)
    )
  );
};

// Navigation builders and routers
export const useNavigationBuilder = (router: any, options: any) => {
  const navigation = createMockNavigation();
  return {
    state: { index: 0, routes: [{ key: 'mock', name: 'Mock' }] },
    navigation,
    descriptors: {},
  };
};

export const createNavigatorFactory = (Navigator: any) => {
  return (props: any) => React.createElement(Navigator, props);
};

// Mock routers
export const TabRouter = (options: any) => ({
  type: 'tab',
  getInitialState: () => ({ index: 0, routes: [] }),
  getRehydratedState: (state: any) => state,
  getStateForRouteNamesChange: (state: any) => state,
  getStateForRouteFocus: (state: any) => state,
  getStateForAction: (state: any, action: any) => state,
  shouldActionChangeFocus: () => false,
});

export const StackRouter = (options: any) => ({
  type: 'stack',
  getInitialState: () => ({ index: 0, routes: [] }),
  getRehydratedState: (state: any) => state,
  getStateForRouteNamesChange: (state: any) => state,
  getStateForRouteFocus: (state: any) => state,
  getStateForAction: (state: any, action: any) => state,
  shouldActionChangeFocus: () => false,
});

// Common navigation actions
export const CommonActions = {
  navigate: (screen: string, params?: any) => ({ type: 'NAVIGATE', payload: { name: screen, params } }),
  goBack: () => ({ type: 'GO_BACK' }),
  reset: (state: any) => ({ type: 'RESET', payload: state }),
  setParams: (params: any) => ({ type: 'SET_PARAMS', payload: params }),
};

export const StackActions = {
  push: (screen: string, params?: any) => ({ type: 'PUSH', payload: { name: screen, params } }),
  pop: (count?: number) => ({ type: 'POP', payload: { count } }),
  popToTop: () => ({ type: 'POP_TO_TOP' }),
  replace: (screen: string, params?: any) => ({ type: 'REPLACE', payload: { name: screen, params } }),
};

export const TabActions = {
  jumpTo: (screen: string, params?: any) => ({ type: 'JUMP_TO', payload: { name: screen, params } }),
};

// Link component
export const Link = ({ to, children, ...props }: any) => 
  React.createElement('a', { href: to, ...props }, children);

// Default export
export default {
  NavigationContainer,
  NavigationContext,
  NavigationRouteContext,
  useNavigation,
  useRoute,
  useFocusEffect,
  useIsFocused,
  useNavigationState,
  useTheme,
  useLinkBuilder,
  useNavigationBuilder,
  createNavigatorFactory,
  TabRouter,
  StackRouter,
  CommonActions,
  StackActions,
  TabActions,
  Link,
};
