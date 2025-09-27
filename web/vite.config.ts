import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Make all 'react-native' imports resolve to web with absolute path
      'react-native$': path.resolve(__dirname, 'node_modules/react-native-web'),
      'react-native/Libraries/Animated/Easing': path.resolve(__dirname, 'node_modules/react-native-web/dist/exports/Easing'),
      'react-native/Libraries/Components/View/ViewStylePropTypes': path.resolve(__dirname, 'node_modules/react-native-web/dist/exports/ViewStylePropTypes'),
      'react-native/Libraries/Utilities/codegenNativeComponent': path.resolve(__dirname, 'shims/empty.ts'),
      'react-native': path.resolve(__dirname, 'node_modules/react-native-web'),

      // Stub native-only libs so bundling succeeds
      'react-native-calendars': path.resolve(__dirname, 'shims/react-native-calendars.tsx'),
      'react-native-swipe-gestures': path.resolve(__dirname, 'shims/react-native-swipe-gestures.ts'),
      'react-native-restart': path.resolve(__dirname, 'shims/empty.ts'),
      'react-native-screens': path.resolve(__dirname, 'shims/react-native-screens.ts'),
      'react-native-vector-icons/MaterialIcons': path.resolve(__dirname, 'shims/empty.ts'),
      'react-native-vector-icons': path.resolve(__dirname, 'shims/empty.ts'),
      'react-native-gesture-handler': path.resolve(__dirname, 'shims/gesture-handler.ts'),
      '@react-native-async-storage/async-storage': path.resolve(__dirname, 'shims/async-storage.ts'),
      '@shopify/react-native-skia': path.resolve(__dirname, 'shims/react-native-skia.tsx'),
      'react-native-safe-area-context': path.resolve(__dirname, 'shims/safe-area-context.ts'),
      '@react-navigation/native-stack': path.resolve(__dirname, 'shims/react-navigation-native-stack.ts'),
      '@react-navigation/native': path.resolve(__dirname, 'shims/react-navigation-native.ts'),

      // (Add more shims here if another package complains)
    },
    conditions: ['browser', 'module', 'import', 'default', 'react-native'],
    extensions: [
      '.web.tsx', '.web.ts', '.web.jsx', '.web.js',
      '.tsx', '.ts', '.jsx', '.js'
    ],
  },
  server: {
    // allow importing from the parent repo (../App, ../src/*)
    fs: { allow: ['..'] },
  },
  optimizeDeps: {
    include: [
      'react-native-web',
      '@react-navigation/bottom-tabs',
      '@react-navigation/stack',
    ],
  },
  define: {
    global: 'globalThis',
    __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
  },
});
