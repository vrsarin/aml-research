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
import { MouseEvent } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import UserService from 'apps/research-ui//src/app/services/user-service';

export interface PortalProps {}

const defaultTheme = createTheme();

export function Portal(props: PortalProps) {
  const navigate = useNavigate();
  function handleHome(event: MouseEvent<HTMLButtonElement>): void {
    navigate('/');
  }

  function handleLogin(event: MouseEvent<HTMLButtonElement>): void {
    UserService.doLogin();
  }

  function handleLogout(event: MouseEvent<HTMLButtonElement>): void {
    UserService.doLogout();
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
                  {UserService.isLoggedIn() ? (
                    <Typography>
                      Welcome back: {UserService.getUsername()}
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
          <Container>
            <Routes>
              <Route path="/" Component={Home} />
              <Route path="/vault" Component={Vault} />
            </Routes>
          </Container>
        </Box>
      </ThemeProvider>
    </Box>
  );
}

export default Portal;
