import { MouseEvent } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  IconButton,
  Stack,
} from '@mui/material';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import { useNavigate } from 'react-router-dom';
import { CaseFileModel, CaseStatus } from '../../../models/Vault.Model';
import { ActionTypes } from '../../../models/Action-Types.Enum';

export interface CaseFileGridProps {
  vaults: CaseFileModel[];
  handleAction(actionType: ActionTypes, identifier: string): void;
}

export function CaseFileGrid(props: CaseFileGridProps) {
  const navigate = useNavigate();

  function RenderCards(value: CaseFileModel): any {
    function handleArchiveVisibility(): boolean {
      return value.status === CaseStatus.Archived;
    }
    function handleOpenFile(event: any): void {
      navigate(`/vault?id=${value.vaultId}`);
    }
    function handleArchive(event: MouseEvent<HTMLButtonElement>): void {
      props.handleAction(ActionTypes.ArchiveFolder, event.currentTarget.id);
    }

    return (
      <Box key={value.vaultId} padding={1}>
        <Card>
          <CardHeader
            avatar={<Avatar aria-label="Case File"></Avatar>}
            title={value.name}
            subheader={value.status}
          ></CardHeader>
          <CardContent>{value.description}</CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="Open Case" onClick={handleOpenFile}>
              <FileOpenIcon></FileOpenIcon>
            </IconButton>
            <IconButton
              id={`${value.vaultId}`}
              aria-label="Archive Case"
              onClick={handleArchive}
              disabled={handleArchiveVisibility()}
            >
              <ArchiveIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Box>
    );
  }

  return (
    <Container>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
      >
        {props.vaults.length > 0 ? (
          props.vaults.map((r: CaseFileModel) => RenderCards(r))
        ) : (
          <Box></Box>
        )}
      </Stack>
    </Container>
  );
}

export default CaseFileGrid;
