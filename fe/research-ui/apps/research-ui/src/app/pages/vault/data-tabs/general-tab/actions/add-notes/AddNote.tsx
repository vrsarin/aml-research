import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Box,
} from '@mui/material';
import axios from 'axios';
import { MouseEvent, useState } from 'react';

export interface AddNoteProps {
  identifier: string;
  open: boolean;
  handleClose: (refresh: boolean) => void;
}

export function AddNote(props: AddNoteProps) {
  const client = axios.create({
    baseURL: 'http://host.docker.internal:8081/case-files',
  });
  const [note, setNote] = useState({
    name: '',
    content: '',
  });

  function handleClose(event: MouseEvent<HTMLButtonElement>): void {
    props.handleClose(false);
  }

  function handleSubmit(event: MouseEvent<HTMLButtonElement>): void {
    client
      .get(`${props.identifier}/content/upload-url?filename=${note.name}.txt`)
      .then((response) => {
        client
          .put(response.data, note.content, {
            headers: {
              'Content-Type': 'text/plain',
              'Content-Encoding': note.content.length,
            },
          })
          .then((response) => props.handleClose(false))
          .catch((response) => alert('Inner Loop ' + response));
      })
      .catch((response) => {
        alert(response);
      });
    setNote({
      name: '',
      content: '',
    });
    props.handleClose(true);
  }

  return (
    <Box component="form">
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>Add New Note</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Key is to quickly search notes later. Note is any text that is
            relevant to this case.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            required
            variant="standard"
            value={note.name}
            onChange={(e) => setNote({ ...note, name: e.currentTarget.value })}
          />
          <TextField
            margin="dense"
            id="note"
            name="note"
            label="Note"
            type="text"
            fullWidth
            variant="standard"
            multiline
            rows={10}
            value={note.content}
            onChange={(e) =>
              setNote({ ...note, content: e.currentTarget.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AddNote;
