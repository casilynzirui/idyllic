// Comprehensive shim for react-native-screens
import React from 'react';
import { View } from 'react-native';

export const enableScreens = () => {
  // No-op for web - disable native screen optimization
  console.log('enableScreens() called - disabled for web compatibility');
};

export const screensEnabled = () => false; // Return false to disable native screens

// Force React Navigation to use regular View components instead of native screens
export const Screen = View;
export const ScreenContainer = View;
export const NativeScreen = View;
export const NativeScreenContainer = View;
export const ScreenStack = View;

// All screen-related components should just be regular Views
export const ScreenStackHeaderConfig = View;
export const ScreenStackHeaderBackButtonImage = View;
export const ScreenStackHeaderRightView = View;
export const ScreenStackHeaderLeftView = View;
export const ScreenStackHeaderCenterView = View;
export const ScreenStackHeaderSearchBarView = View;

// Additional screen components that might be used
export const FullWindowOverlay = View;
export const ScreenNavigationContainer = View;

// Screen transition components
export const TransitionProgressContext = React.createContext(0);
export const useTransitionProgress = () => ({ progress: { value: 0 } });

// Header components
export const Header = View;
export const HeaderTitle = View;
export const HeaderButton = View;
export const HeaderBackButton = View;

// Modal and presentation components  
export const Modal = View;
export const ModalScreen = View;

export default {
  enableScreens,
  screensEnabled,
  Screen,
  ScreenContainer,
  NativeScreen,
  NativeScreenContainer,
  ScreenStack,
  ScreenStackHeaderConfig,
  ScreenStackHeaderBackButtonImage,
  ScreenStackHeaderRightView,
  ScreenStackHeaderLeftView,
  ScreenStackHeaderCenterView,
  ScreenStackHeaderSearchBarView,
  FullWindowOverlay,
  ScreenNavigationContainer,
  TransitionProgressContext,
  useTransitionProgress,
  Header,
  HeaderTitle,
  HeaderButton,
  HeaderBackButton,
  Modal,
  ModalScreen,
};
