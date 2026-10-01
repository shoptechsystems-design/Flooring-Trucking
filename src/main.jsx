import React, { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('React root element was not found.');
}

const application = (
  <StrictMode>
    <App />
  </StrictMode>
);

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, application);
} else {
  createRoot(rootElement).render(application);
}
