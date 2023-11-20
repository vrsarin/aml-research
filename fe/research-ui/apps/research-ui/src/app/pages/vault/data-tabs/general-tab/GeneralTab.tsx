import { Box, Button, Divider, TextField } from '@mui/material';
import {
  CaseFileModel,
  CaseStatus,
} from 'apps/research-ui/src/app/models/CaseFile.Model';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import AddLinkIcon from '@mui/icons-material/AddLink';

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
    caseStatus: CaseStatus.Open,
    name: '',
    description: '',
  };
  const [caseFile, setCaseFile] = useState(initialState);

  useEffect(() => {
    if (props.identifier) {
      getCaseFile();
    }
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
        <Button component="label" startIcon={<NoteAddIcon />}>
          Add New Note
        </Button>
        <Button component="label" startIcon={<AddLinkIcon />}>
          Add Web Link
        </Button>
        <Button component="label" startIcon={<CloudUploadIcon />}>
          Upload file
          <VisuallyHiddenInput type="file" />
        </Button>
      </Box>
      <Divider />
    </Box>
  );
}

export default GeneralTab;
