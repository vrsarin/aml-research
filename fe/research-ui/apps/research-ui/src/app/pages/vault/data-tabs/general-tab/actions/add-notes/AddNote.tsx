import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import { MouseEvent } from 'react';

export interface AddNoteProps {
  identifier:string
  open: boolean;
  handleClose: (refresh: boolean) => void;
}

export function AddNote(props: AddNoteProps) {

  function handleClose(event: MouseEvent<HTMLButtonElement>): void {
    props.handleClose(false);
  }

  function handleSubmit(event: MouseEvent<HTMLButtonElement>): void {
    props.handleClose(true);
  }

  return (
    <Dialog open={props.open} onClose={handleClose}>
      <DialogTitle>Add New Note</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Key is to quickly search notes later. Note is any text that is relevant to this case.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="decription"
          name="description"
          label="Short Description"
          type="text"
          fullWidth
          variant="standard"
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
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddNote;
