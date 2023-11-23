import { Box, Button } from '@mui/material';
import Security from './security';

const Authenticated = (children: any) => {
  function handleLogin(event: any): void {
    Security.doLogin();
  }
  if (Security.isLoggedIn()) return children;
  else {
    return (
      <Box>
        <Button onClick={handleLogin}>LOgin</Button>
      </Box>
    );
  }
};

export default Authenticated;
