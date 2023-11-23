import { MouseEvent, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import axios from 'axios';
import { CaseFileModel, CaseStatus } from '../../../models/Vault.Model';
import { environment } from 'apps/research-ui/src/environments/environment';

const client = axios.create({
  baseURL: environment.VAULT_URL,
});
export interface CreateCaseFileProps {
  open: boolean;
  handleClose: (refresh: boolean) => void;
}

export function CreateCaseFile(props: CreateCaseFileProps) {
  const initialState: CaseFileModel = {
    vaultId: '',
    status: CaseStatus.Open,
    name: '',
    description: '',
  };
  const [folder, setfolder] = useState(initialState);

  function handleClose(event: MouseEvent<HTMLButtonElement>): void {
    props.handleClose(false);
  }

  function handleCreate(event: MouseEvent<HTMLButtonElement>): void {
    client
      .post('', folder)
      .then((response) => {
        props.handleClose(true);
      })
      .catch((response) => {
        alert(response);
      });
  }

  return (
    <Dialog open={props.open} onClose={handleClose}>
      <DialogTitle>Create New Case Folder</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Case folders are easy way to organize all data related to a particular
          case. Create a new case file so that we can start with research.
        </DialogContentText>

        <TextField
          autoFocus
          margin="dense"
          id="name"
          name="name"
          label="Folder Name"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) =>
            setfolder({ ...folder, name: e.currentTarget.value })
          }
        />
        <TextField
          margin="dense"
          id="description"
          name="description"
          label="Description"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) =>
            setfolder({ ...folder, description: e.currentTarget.value })
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleCreate}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateCaseFile;
