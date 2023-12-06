import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import Portal from './app/portal';
import { BrowserRouter } from 'react-router-dom';
import UserService from 'apps/research-ui//src/app/services/user-service';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const renderApp = () =>
  root.render(
    <StrictMode>
      <CssBaseline enableColorScheme />
      <BrowserRouter>
        <Portal />
      </BrowserRouter>
    </StrictMode>
  );

UserService.initKeycloak(renderApp);
