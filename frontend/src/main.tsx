import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ComandaProvider } from './pages/ComandaContext'; // << Adicione essa linha!

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ComandaProvider> {/* Envolver o App */}
      <App />
    </ComandaProvider>
  </StrictMode>,
);
