import { useEffect, useState } from 'react';
import { Box, Container, Fab } from '@mui/material';
import CasefileList from './case-file-list/CasefileList';
import CaseFileGrid from './case-file-grid/CaseFileGrid';
import CreateCaseFile from './create-case-file/CreateCaseFile';
import axios from 'axios';
import { CaseFileModel } from '../../models/Vault.Model';
import { ActionTypes } from '../../models/Action-Types.Enum';
import { environment } from 'apps/research-ui/src/environments/environment';
import AddIcon from '@mui/icons-material/Add';

const client = axios.create({
  baseURL: environment.VAULT_URL,
});

export function Home() {
  const initialState: CaseFileModel[] = [];

  const [vaults, setVaults] = useState(initialState);
  const [value, setValue] = useState('Grid');
  const [open, setOpen] = useState(false);

  function handleChange(event: any): void {
    const actualElement = event.currentTarget as HTMLButtonElement;
    const selectedValue =
      actualElement.attributes.getNamedItem('data-tag')?.value;
    if (selectedValue === 'List' || selectedValue === 'Grid') {
      setValue(selectedValue);
    }
  }

  function handleCreateCase(event: any): void {
    setOpen(true);
  }

  function handleClose(refresh: boolean): void {
    setOpen(false);
    if (refresh === true) {
      getFolders();
    }
  }

  useEffect(() => {
    getFolders();
  }, []);

  function getFolders(): void {
    client
      .get('')
      .then((response) => {
        setVaults(response.data);
      })
      .catch((response) => {
        alert(response);
      });
  }

  function archiveFolder(identifier: string): void {
    const url = `archive?identifier=${identifier}`;
    client.put(url, {}).then((response) => {});
  }

  function handleAction(actionType: ActionTypes, identifier: string): void {
    switch (actionType) {
      case ActionTypes.ArchiveFolder:
        archiveFolder(identifier);
        break;

      default:
        break;
    }
    getFolders();
  }

  return (
    <Container>
      <Box display={'flex'} alignItems={'center'}>
        {value === 'List' ? (
          <CasefileList />
        ) : (
          <CaseFileGrid vaults={vaults} handleAction={handleAction} />
        )}

        <CreateCaseFile open={open} handleClose={handleClose}></CreateCaseFile>
        <Fab
          color="secondary"
          aria-label="add"
          sx={{ position: 'absolute', bottom: '100px;', right: '50px;' }}
          onClick={handleCreateCase}
        >
          <AddIcon />
        </Fab>
      </Box>
    </Container>
  );
}

export default Home;
