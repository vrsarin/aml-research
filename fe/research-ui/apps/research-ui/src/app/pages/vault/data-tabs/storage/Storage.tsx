import { Box, Button, Grid, LinearProgress, styled } from '@mui/material';
import { environment } from 'apps/research-ui/src/environments/environment';
import axios from 'axios';
import * as Minio from 'minio';
import { SyntheticEvent, useEffect, useState, MouseEvent } from 'react';
import AddNote from './actions/add-notes/AddNote';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import AddLinkIcon from '@mui/icons-material/AddLink';

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
  let minioclient: Minio.Client;

  const client = axios.create({
    baseURL: environment.MINIO_URL,
  });

  useEffect(() => {
    getMinioCredentials();
  }, []);

  const [addNote, setAddNote] = useState(false);
  const [showProgress, setProgress] = useState('none');

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

  function getMinioCredentials() {
    client
      .post(
        `?Action=AssumeRoleWithWebIdentity&Version=2011-06-15&DurationSeconds=86000&WebIdentityToken=${sessionStorage.getItem(
          'access_token'
        )}`,
        {}
      )
      .then((response: { data: string }) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, 'text/xml');

        minioclient = new Minio.Client({
          endPoint: environment.MINIO_HOST,
          port: 9000,
          useSSL: false,
          accessKey:
            xmlDoc
              .getElementsByTagName('AccessKeyId')[0]
              .textContent?.toString() ?? '',
          secretKey:
            xmlDoc
              .getElementsByTagName('SecretAccessKey')[0]
              .textContent?.toString() ?? '',
          sessionToken:
            xmlDoc
              .getElementsByTagName('SessionToken')[0]
              .textContent?.toString() ?? '',
        });
        getFileList();
      })
      .catch((response) => alert(response));
  }

  function getFileList() {
    const files = minioclient.listObjectsV2(props.identifier);
    files.on('data', function (obj) {
      alert(obj.name);
    });
    files.on('error', function (e) {
      console.log(e);
    });
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
          identifier={props.identifier}
          open={addNote}
          handleClose={handleAddNodeClose}
        ></AddNote>
        <Box sx={{ width: '100%' }} display={showProgress}>
          <LinearProgress />
        </Box>
      </Box>
      <Box>
        <Grid container xs flexDirection={'row'}>
          <Grid item xs={4}>
            Treeview:
          </Grid>
          <Grid item xs>
            Visual:
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Storage;
