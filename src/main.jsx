import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/montserrat';
import './styles/tokens.css';
import './styles/base.css';
import './styles/sections.css';
import App from './App.jsx';
import { initAnalytics } from './lib/analytics.js';

initAnalytics();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
