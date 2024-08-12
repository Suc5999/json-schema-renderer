import React from 'react';
import ReactDOM from 'react-dom/client';
import AppEntry from './App';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppEntry />
  </React.StrictMode>
);
