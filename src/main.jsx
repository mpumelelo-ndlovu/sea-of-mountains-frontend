// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // This line now imports the consolidated CSS file

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);