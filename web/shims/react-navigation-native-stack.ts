// Shim for @react-navigation/native-stack - redirect to regular stack for web
import { createStackNavigator } from '@react-navigation/stack';

// Export createNativeStackNavigator as createStackNavigator for web compatibility
export const createNativeStackNavigator = createStackNavigator;

// Re-export other types that might be needed
export * from '@react-navigation/stack';

export default {
  createNativeStackNavigator,
};
