import { useEffect, useState } from 'react';
import { CaseFileModel } from '../CaseFile.Model';
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
import axios from 'axios';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import { useNavigate } from 'react-router-dom';

const client = axios.create({
  baseURL: 'http://localhost:8081/case-files',
});

export interface CaseFileGridProps {}

export function CaseFileGrid(props: CaseFileGridProps) {

  const navigate=useNavigate()
  const initialState: CaseFileModel[] = [];

  const [caseData, setCaseData] = useState(initialState);

  useEffect(() => {
    getCaseFiles();
  }, []);

  function getCaseFiles(): void {
    client.get('').then((response) => {
      const files = response.data;
      setCaseData(files);
    });
  }

  function handleArchive(event: any): void {
    const url = `archive?identifier=${event.currentTarget.id}`;
    client.put(url, {}).then((response) => {});
    getCaseFiles();
  }

  

  function RenderCards(value: CaseFileModel): any {
    function handleArchiveVisibility(): boolean {
      return value.caseStatus.toLowerCase() === 'archived';
    }
    function handleOpenFile(event: any): void {
      navigate(`/vault?id=${value.identifier}`)
    }
    return (
      <Box padding={1}>
        <Card>
          <CardHeader
            avatar={<Avatar aria-label="Case File"></Avatar>}
            title={value.name}
            subheader={value.caseStatus}
          ></CardHeader>
          <CardContent>{value.description}</CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="Open Case" onClick={handleOpenFile}>
              <FileOpenIcon></FileOpenIcon>
            </IconButton>
            <IconButton
              id={`${value.identifier}`}
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
        {caseData.map((r: CaseFileModel) => RenderCards(r))}
      </Stack>
    </Container>
  );
}

export default CaseFileGrid;
