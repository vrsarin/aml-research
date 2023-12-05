import {
  Box,
  Button,
  Divider,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  styled,
} from '@mui/material';
import axios from 'axios';
import * as Minio from 'minio';
import { SyntheticEvent, useEffect, useState, MouseEvent, useRef } from 'react';
import AddNote from './actions/add-notes/AddNote';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import AddLinkIcon from '@mui/icons-material/AddLink';
import MinioStorageService from 'apps/research-ui/src/app/services/storage-service';

export interface StorageProps {
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

export function Storage(props: StorageProps) {
  const initialFileList: Minio.BucketItem[] = [];
  const [addNote, setAddNote] = useState(false);
  const [bucketFiles, setBucketFiles] = useState(initialFileList);
  const [showProgress, setProgress] = useState('none');
  const loadFiles = useRef(true);
  useEffect(() => {
    if (loadFiles.current) {
      loadFiles.current = false;
      MinioStorageService.initStorage();
      getFileList();
    }
  });

  function handleAddNoteClose(refresh: boolean): void {
    setAddNote(false);
  }

  function handleAddNoteSave(name: string, content: string): void {
    MinioStorageService.getClient().putObject(
      props.identifier,
      `${name.replace(' ', '_')}.txt`,
      content,
      content.length,
      {
        'Content-Type': 'text/plain',
        'acquired-from': 'notes',
      },
      function (err, objInfo) {
        if (err) {
          alert(err);
        }
        setAddNote(false);
        getFileList();
      }
    );
  }

  function handleAddNoteOpen(event: MouseEvent<HTMLLabelElement>): void {
    setAddNote(true);
  }

  function handleFileSelected(event: SyntheticEvent<HTMLInputElement>): void {
    const files = Array.from(event.currentTarget.files ?? []);
    setProgress('');

    files.map((file) => {
      MinioStorageService.getClient().presignedPutObject(
        props.identifier,
        file.name,
        function (err, preSignedUrl) {
          if (err) {
            alert(err);
          }
          const uploadFile = axios.create({
            baseURL: preSignedUrl,
          });
          uploadFile
            .put('', file, {
              headers: {
                'Content-Type': file.type,
                'acquired-from': 'upload',
              },
            })
            .then((response) => {
              getFileList();
            })
            .catch((error) => {
              alert(error);
            });
        }
      );
    });
    setProgress('none');
  }

  function getFileList() {
    const client=MinioStorageService.getClient();
    const files =client.listObjectsV2(
      props.identifier,
      undefined,
      false
    );
    files.on('data', function (obj) {
      const found = bucketFiles.findIndex((r) => r.name === obj.name);
      if (found < 0) {
        setBucketFiles((f) => {
          return [...f, obj];
        });
      }
    });
    files.on('error', function (e) {
      console.log(e);
    });
  }

  function handleShowFileMetaData(event: MouseEvent<HTMLButtonElement>): void {
    alert(`We will show details of file selected ${event.currentTarget.id}`);
  }
  return (
    <Box>
      <Box>
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
          open={addNote}
          handleClose={handleAddNoteClose}
          handleSave={handleAddNoteSave}
        ></AddNote>
        <Box sx={{ width: '100%' }} display={showProgress}>
          <LinearProgress />
        </Box>
        <Divider></Divider>
      </Box>
      <Box>
        <Grid container xs flexDirection={'row'}>
          <Grid item xs={4} paddingTop={2}>
            <Stack spacing={1}>
              <Paper
                elevation={2}
                sx={{ padding: '5px;', textAlign: 'center' }}
              >
                Files:{' '}
              </Paper>
              {bucketFiles.map((r) => {
                return (
                  <Button
                    id={r.name}
                    variant="outlined"
                    sx={{
                      padding: '5px;',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                    onClick={handleShowFileMetaData}
                  >
                    {r.name}
                  </Button>
                );
              })}
            </Stack>
          </Grid>
          <Grid item xs textAlign={'center'}>
            File Details:
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Storage;
