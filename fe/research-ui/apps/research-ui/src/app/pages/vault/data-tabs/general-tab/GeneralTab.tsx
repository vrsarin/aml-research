import {
  Box,
  Button,
  Divider,
  TextField,
} from '@mui/material';
import { CaseFileModel } from 'apps/research-ui/src/app/models/CaseFile.Model';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];
const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const client = axios.create({
  baseURL: 'http://host.docker.internal:8081/case-files',
});
export interface GeneralTabProps {
  identifier: string;
}
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export function GeneralTab(props: GeneralTabProps) {
  const initialState: CaseFileModel = {
    identifier: 0,
    caseStatus: '',
    name: '',
    description: '',
  };
  const [caseFile, setCaseFile] = useState(initialState);

  useEffect(() => {
    if (props.identifier) {
      getCaseFile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.identifier]);

  function getCaseFile(): void {
    client
      .get(`${props.identifier}`)
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
      <Box width={1} padding={1}>
        <TextField
          label="Case Identifier"
          value={caseFile.identifier}
          disabled
        />
      </Box>
      <Box padding={1}>
        <TextField
          label="Display Name"
          value={caseFile.name}
          sx={{ minWidth: '200px;' }}
          fullWidth
          disabled
        />
      </Box>
      <Box padding={1}>
        <TextField
          label="Short Description"
          value={caseFile.description}
          fullWidth
          disabled
        />
      </Box>
      <Box>
        <Button component="label" startIcon={<CloudUploadIcon />}>
          Upload file
          <VisuallyHiddenInput type="file" />
        </Button>
        <Button>
          <SavedSearchIcon />
          Add Web Crawler
        </Button>
      </Box>
      <Divider />
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}

export default GeneralTab;
