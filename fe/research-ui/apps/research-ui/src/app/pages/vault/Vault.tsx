import { Component } from 'react';

import { Box } from '@mui/material';

export interface VaultProps {}

export class Vault extends Component<VaultProps> {
  override render() {
    return <Box>This is Vault!</Box>;
  }
}

export default Vault;
