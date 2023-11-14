import { useState } from 'react';
import { Box, Divider, IconButton, Stack } from '@mui/material';
import CasefileList from './case-file-list/CasefileList';
import ViewListIcon from '@mui/icons-material/ViewList';
import GridViewIcon from '@mui/icons-material/GridView';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import CaseFileGrid from './case-file-grid/CaseFileGrid';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export function Home() {
  const [value, setValue] = useState('Grid');

  function handleChange(event: any): void {
    const actualElement = event.currentTarget as HTMLButtonElement;
    const selectedValue =
      actualElement.attributes.getNamedItem('data-tag')?.value;
    if (selectedValue === 'List' || selectedValue === 'Grid') {
      setValue(selectedValue);
    }
  }

  function handleCreateCase(event: any): void {
    throw new Error('Function not implemented.');
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
        {value === 'List' ? <CasefileList /> : <CaseFileGrid />}
      </Box>
    </Box>
  );
}

export default Home;
