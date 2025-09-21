import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Register PWA service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(err => {
        console.error('SW registration failed: ', err);
      });
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>)
