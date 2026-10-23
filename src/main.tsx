import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Safely filter third-party browser extension errors (e.g., MetaMask inpage scripts)
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    const errorString = String(event.reason?.stack || event.reason?.message || event.reason || '');
    if (
      errorString.includes('chrome-extension://') ||
      errorString.includes('MetaMask') ||
      errorString.includes('ethereum')
    ) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  });

  window.addEventListener('error', (event) => {
    const filename = String(event.filename || '');
    const message = String(event.message || '');
    if (
      filename.includes('chrome-extension://') ||
      message.includes('MetaMask') ||
      message.includes('ethereum')
    ) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

