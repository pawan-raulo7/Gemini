import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import ContextProvider from './context/Context.jsx';

// Render the application with ContextProvider wrapped around App
ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <App />
  </ContextProvider>
);
