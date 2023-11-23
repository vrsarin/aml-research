import { useEffect, useState } from 'react';
import { Box, Divider, IconButton, Stack } from '@mui/material';
import CasefileList from './case-file-list/CasefileList';
import ViewListIcon from '@mui/icons-material/ViewList';
import GridViewIcon from '@mui/icons-material/GridView';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import CaseFileGrid from './case-file-grid/CaseFileGrid';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CreateCaseFile from './create-case-file/CreateCaseFile';
import axios from 'axios';
import { CaseFileModel } from '../../models/Vault.Model';
import { ActionTypes } from '../../models/Action-Types.Enum';
import { environment } from 'apps/research-ui/src/environments/environment';

const client = axios.create({
  baseURL: environment.VAULT_URL,
});

export function Home() {
  const initialState: CaseFileModel[] = [];

  const [vaults,setVaults] = useState(initialState);
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
        alert(response)
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
    <Box display={'flex'} alignItems={'center'}>
      <Box
        width={'fit-content'}
        alignItems={'center'}
        padding={0.75}
        boxShadow={2}
        borderRadius={2}
      >
        <Stack direction="column" spacing={1}>
          <IconButton aria-label="Create Case" onClick={handleCreateCase}>
            <CreateNewFolderIcon> </CreateNewFolderIcon>
          </IconButton>
          <Divider flexItem></Divider>
          <IconButton
            id="List"
            aria-label="ListView"
            data-tag="List"
            onClick={handleChange}
          >
            <ViewListIcon></ViewListIcon>
          </IconButton>
          <IconButton
            id="grid"
            aria-label="GridView"
            data-tag="Grid"
            onClick={handleChange}
          >
            <GridViewIcon></GridViewIcon>
          </IconButton>
          <Divider flexItem></Divider>
          <IconButton
            id="filter"
            aria-label="Filter View"
            data-tag="Filter"
            onClick={handleChange}
          >
            <FilterAltIcon></FilterAltIcon>
          </IconButton>
        </Stack>
      </Box>
      <Box marginTop={4}>
        {value === 'List' ? (
          <CasefileList />
        ) : (
          <CaseFileGrid vaults={vaults} handleAction={handleAction} />
        )}
      </Box>
      <CreateCaseFile open={open} handleClose={handleClose}></CreateCaseFile>
    </Box>
  );
}

export default Home;
