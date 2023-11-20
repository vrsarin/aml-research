import { Box, Container, ThemeProvider, createTheme } from '@mui/material';
import Home from './pages/home/Home';
import { Routes, Route } from 'react-router-dom';
import Vault from './pages/vault/Vault';

export interface PortalProps {}

const defaultTheme = createTheme();

export function Portal(props: PortalProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      {/* <Box>
        <Topbar />
      </Box> */}
      <Box sx={{ width: 'auto' }}>
        <Container>
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/vault" Component={Vault} />
            {/* <Route path="/Nodes" Component={Nodes} />
            <Route path="/Graph" Component={Graph} />
            <Route path="/Report" Component={Report} /> */}
          </Routes>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default Portal;
