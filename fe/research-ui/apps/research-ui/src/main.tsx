import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import Portal from './app/portal';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <CssBaseline enableColorScheme />
    <BrowserRouter>
      <Portal />
    </BrowserRouter>
  </StrictMode>
);
