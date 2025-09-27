console.log('🔍 main.tsx loaded');

import React from 'react';
import { createRoot } from 'react-dom/client';
import { requireImage } from './shims/images';
import { SafeAreaProvider } from './shims/safe-area-context';

console.log('✅ React imported successfully');
console.log('✅ createRoot imported successfully');

// Add global require function for images
(window as any).require = (path: string) => {
  if (path.includes('.png') || path.includes('.jpg') || path.includes('.jpeg')) {
    return requireImage(path);
  }
  throw new Error(`require() not supported for: ${path}`);
};

console.log('✅ Global require function set up for images');

console.log('🔍 Now loading your actual React Native app...');

// Load working version with your real screens
import('./WorkingIdyllicApp').then(({ default: App }) => {
  console.log('✅ Your app imported successfully');
  
  console.log('🔍 Looking for root element...');
  const container = document.getElementById('root');
  if (!container) {
    console.error('❌ Root element not found!');
    throw new Error('Root element not found');
  }
  console.log('✅ Root element found:', container);

  console.log('🔍 Creating React root...');
  const root = createRoot(container);
  console.log('✅ React root created');

  console.log('🔍 Rendering your app...');
  try {
    // Wrap the app in SafeAreaProvider for React Native compatibility
    const WrappedApp = React.createElement(SafeAreaProvider, {}, React.createElement(App));
    root.render(WrappedApp);
    console.log('✅ Your app rendered!');
    
    // Check if content actually appeared
    setTimeout(() => {
      const content = container.innerHTML;
      console.log('📊 Root content length:', content.length);
      console.log('📊 Root element dimensions:', {
        width: container.offsetWidth,
        height: container.offsetHeight,
        display: getComputedStyle(container).display,
        visibility: getComputedStyle(container).visibility
      });
      
      if (content.length > 0) {
        console.log('✅ App content successfully rendered!');
        console.log('📄 First 200 chars of content:', content.substring(0, 200));
      } else {
        console.log('⚠️ App rendered but no content visible');
      }
    }, 1000);
    
    // Also check after loading screen should complete
    setTimeout(() => {
      const content = container.innerHTML;
      console.log('📊 After 5 seconds - Root content length:', content.length);
      console.log('📊 After 5 seconds - Root dimensions:', {
        width: container.offsetWidth,
        height: container.offsetHeight
      });
      if (content.length === 0) {
        console.log('⚠️ Content disappeared after loading screen!');
      }
    }, 5000);
  } catch (renderError) {
    console.error('❌ Render error:', renderError);
    throw renderError;
  }
  
}).catch((error) => {
  console.error('❌ Error loading your app:', error);
  console.error('❌ Error details:', {
    message: error.message,
    stack: error.stack,
    name: error.name
  });
  
  // Show detailed error info
  const container = document.getElementById('root');
  if (container) {
    const root = createRoot(container);
    const ErrorComponent = () => (
      React.createElement('div', {
        style: { 
          padding: '20px', 
          backgroundColor: '#ff6b6b', 
          color: 'white',
          fontFamily: 'monospace',
          fontSize: '14px',
          lineHeight: '1.4'
        }
      }, [
        React.createElement('h1', { key: 'h1', style: { marginBottom: '10px' } }, '❌ App Loading Failed'),
        React.createElement('p', { key: 'p1', style: { marginBottom: '10px' } }, `Error: ${error.message}`),
        React.createElement('p', { key: 'p2', style: { marginBottom: '10px' } }, `Type: ${error.name}`),
        React.createElement('details', { key: 'details', style: { marginTop: '10px' } }, [
          React.createElement('summary', { key: 'summary' }, 'Stack Trace'),
          React.createElement('pre', { 
            key: 'stack', 
            style: { 
              fontSize: '12px', 
              marginTop: '10px', 
              backgroundColor: 'rgba(0,0,0,0.2)', 
              padding: '10px',
              borderRadius: '4px',
              overflow: 'auto'
            } 
          }, error.stack || 'No stack trace available')
        ])
      ])
    );
    root.render(React.createElement(ErrorComponent));
  }
});
