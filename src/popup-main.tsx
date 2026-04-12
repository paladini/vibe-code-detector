import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import VibePopup from './components/VibePopup';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <VibePopup />
  </StrictMode>,
);
