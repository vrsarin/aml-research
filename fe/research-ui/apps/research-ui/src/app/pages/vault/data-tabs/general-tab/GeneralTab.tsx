import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Divider, Fab, TextField, Typography } from '@mui/material';
import {
  CaseFileModel,
  CaseStatus,
} from 'apps/research-ui/src/app/models/Vault.Model';
import { environment } from 'apps/research-ui/src/environments/environment';
import AddIcon from '@mui/icons-material/Add';

const client = axios.create({
  baseURL: environment.VAULT_URL,
});
export interface GeneralTabProps {
  identifier: string;
}

export function GeneralTab(props: GeneralTabProps) {
  const initialState: CaseFileModel = {
    vaultId: '',
    status: CaseStatus.Open,
    name: '',
    description: '',
  };
  const [caseFile, setCaseFile] = useState(initialState);

  useEffect(() => {
    if (props.identifier) {
      getCaseFile(props.identifier);
    }
  }, [props.identifier]);

  function getCaseFile(id: string): void {
    client
      .get(id)
      .then((response) => {
        const file = response.data;
        setCaseFile(file);
      })
      .catch((response) => {
        alert(response);
      });
  }

  return (
    <Box paddingBottom={0.5}>
      <Box padding={2}>
        <Typography>Case #: {caseFile.vaultId}</Typography>
      </Box>
      <Box padding={1}>
        <TextField
          label="Display Name"
          value={caseFile.name}
          sx={{ minWidth: '200px;' }}
          fullWidth
        />
      </Box>
      <Box padding={1}>
        <TextField
          label="Short Description"
          value={caseFile.description}
          fullWidth
        />
      </Box>
      <Divider textAlign="left">Taxonomy</Divider>
      <Box
        flexDirection={'row'}
        alignItems={'flex-end'}
        alignContent={'flex-end'}
        textAlign={'end'}
      >
        <Fab size="small" color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Box>
    </Box>
  );
}

export default GeneralTab;
