import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from '@mui/material';
import Home from './pages/home/Home';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Vault from './pages/vault/Vault';
import Keycloak from 'keycloak-js';
import { MouseEvent } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

export interface PortalProps {}

const defaultTheme = createTheme();
const keycloak = new Keycloak({
  url: 'http://localhost:8080',
  realm: 'aml',
  clientId: 'aml',
});

const authenticated = await keycloak.init({
  onLoad: 'check-sso',
  checkLoginIframe: true,
  pkceMethod: 'S256',
  // enableLogging: true,
  // silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
  // redirectUri: window.location.origin,
  flow: 'implicit',
});

// if (!authenticated) {
//   keycloak.login();
// } else {
//   let resultant = await keycloak.loadUserInfo();
// }

if (authenticated) {
  sessionStorage.setItem('access_token', keycloak.token ?? '');
  sessionStorage.setItem('id_token', keycloak.idToken ?? '');
}

export function Portal(props: PortalProps) {
  const navigate = useNavigate();
  function handleHome(event: MouseEvent<HTMLButtonElement>): void {
    navigate('/');
  }

  function handleLogin(event: MouseEvent<HTMLButtonElement>): void {
    keycloak.login();
  }

  function handleLogout(event: MouseEvent<HTMLButtonElement>): void {
    keycloak.logout();
  }

  return (
    <Box>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ width: 'auto' }}>
          <Box>
            <AppBar position="static">
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={handleHome}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ display: { xs: 'none', sm: 'block' } }}
                >
                  Research UI
                </Typography>
                <Typography
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                ></Typography>
                <Typography noWrap component="div">
                  {keycloak.authenticated ? (
                    <Typography>
                      Welcome back: {keycloak.idTokenParsed?.name ?? ''}{' '}
                      <Button
                        variant="contained"
                        endIcon={<LogoutIcon />}
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </Typography>
                  ) : (
                    <Button
                      variant="contained"
                      endIcon={<LoginIcon />}
                      onClick={handleLogin}
                    >
                      Login
                    </Button>
                  )}
                </Typography>
              </Toolbar>
            </AppBar>
          </Box>
          <Box display={authenticated ? '' : 'none'}>
            <Container>
              <Routes>
                <Route path="/" Component={Home} />
                <Route path="/vault" Component={Vault} />
              </Routes>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </Box>
  );
}

export default Portal;
