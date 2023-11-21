import { useEffect, useState, MouseEvent, SyntheticEvent } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Divider,
  LinearProgress,
  TextField,
  Typography,
} from '@mui/material';
import {
  CaseFileModel,
  CaseStatus,
} from 'apps/research-ui/src/app/models/CaseFile.Model';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import AddLinkIcon from '@mui/icons-material/AddLink';
import AddNote from './actions/add-notes/AddNote';

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
  const [addNote, setAddNote] = useState(false);
  const [showProgress, setProgress] = useState('none');

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

  function handleAddNodeClose(refresh: boolean): void {
    setAddNote(false);
  }

  function handleAddNoteOpen(event: MouseEvent<HTMLLabelElement>): void {
    setAddNote(true);
  }

  function handleFileSelected(event: SyntheticEvent<HTMLInputElement>): void {
    const files = Array.from(event.currentTarget.files ?? []);
    files.map((file) => {
      setProgress('');
      client
        .get(`${props.identifier}/content/upload-url?filename=${file.name}`)
        .then((response) => {
          client
            .put(response.data, file, {
              headers: {
                'Content-Type': file.type,
                'Content-Encoding': file.length,
              },
            })
            .then((response) => setProgress('none'))
            .catch((response) => alert('Inner Loop ' + response));
        })
        .catch((response) => {
          alert(response);
        });
    });
  }

  return (
    <Box paddingBottom={0.5}>
      <Box padding={2}>
        <Typography>Case File: {caseFile.identifier}</Typography>
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
      <Box>
        <Button
          component="label"
          startIcon={<NoteAddIcon />}
          onClick={handleAddNoteOpen}
        >
          Add New Note
        </Button>

        <Button component="label" startIcon={<AddLinkIcon />}>
          Add Web Link
        </Button>
        <Button component="label" startIcon={<CloudUploadIcon />}>
          Upload file
          <VisuallyHiddenInput type="file" onChange={handleFileSelected} />
        </Button>
      </Box>
      <AddNote
        identifier={props.identifier}
        open={addNote}
        handleClose={handleAddNodeClose}
      ></AddNote>
      <Box sx={{ width: '100%' }} display={showProgress}>
        <LinearProgress />
      </Box>
      <Divider />
    </Box>
  );
}

export default GeneralTab;
