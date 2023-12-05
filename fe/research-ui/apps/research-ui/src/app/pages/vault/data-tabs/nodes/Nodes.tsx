import { ReactNode, useEffect, useState, MouseEvent, ChangeEvent } from 'react';
import {
  Box,
  Button,
  Divider,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import { EntityModel } from 'apps/research-ui/src/app/models/Entity.Model';
import axios from 'axios';
import { environment } from 'apps/research-ui/src/environments/environment';
import { RelationModel } from 'apps/research-ui/src/app/models/Relation.Model';
import RelationTable from './relation-table/RelationTable';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import RelationGraph from './realtion-graph/RelationGraph';

export interface NodedProperties {
  vaultid: string;
}

const client = axios.create({
  baseURL: environment.GRAPH_URL,
});
export function Nodes(props: NodedProperties) {
  const entityInitialData: EntityModel[] = [];
  const entitySelected: EntityModel = {
    id: '',
    labels: [],
    attributes: [],
    elementId: '',
  };
  const relationIntialData: RelationModel[] = [];
  const [relations, setRelations] = useState(relationIntialData);
  const [label, setLabel] = useState('');
  const [labels, setLabels] = useState([]);
  const [entities, setEntities] = useState(entityInitialData);
  const [allEntities, setALlEntities] = useState(entityInitialData);
  const [selected, setSelected] = useState(entitySelected);
  const [depth, setDepth] = useState('2');
  const [showGraph, setShowGraph] = useState(false);

  useEffect(() => {
    if (labels.length <= 0) {
      getLabels(props.vaultid);
      if (label === '') {
        setLabel(labels[0]);
      }
    }
  }, [label, labels, props.vaultid]);

  const getLabels = (id: string) => {
    client
      .get(`${id}/graph/labels`)
      .then((response) => {
        setLabels(response.data);
      })
      .catch((response) => alert(response));
    client
      .get(`${id}/graph/nodes`)
      .then((response) => {
        setALlEntities(response.data);
      })
      .catch((response) => alert(response));
  };
  function handleChangeLabel(
    event: SelectChangeEvent<string>,
    child: ReactNode
  ): void {
    setLabel(event.target.value);
    client
      .get(`${props.vaultid}/graph/labels/${event.target.value}/nodes`)
      .then((response) => {
        const data = response.data;
        setEntities(data);
        setSelected(data[0]);
      })
      .catch((response) => alert(response));
  }

  function handleOpenEntity(event: MouseEvent<HTMLButtonElement>): void {
    const selectedIdx = entities.findIndex(
      (r) => r.id === event.currentTarget.id
    );
    setSelected(entities[selectedIdx]);
  }

  function handleRelationships(event: MouseEvent<HTMLButtonElement>): void {
    client
      .get(
        `${props.vaultid}/graph/labels/${label}/nodes/${selected.id}/relations?depth=${depth}`
      )
      .then((response) => {
        setRelations(response.data);
      })
      .catch((response) => alert(response));
  }
  function handleGraphShow(
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ): void {
    setShowGraph(checked);
  }

  return (
    <Grid container flexWrap={'nowrap'} direction={'row'} flexDirection={'row'}>
      <Grid item xs={3}>
        <InputLabel variant="standard">Labels</InputLabel>
        <Select
          value={label}
          label="Labels"
          onChange={handleChangeLabel}
          fullWidth
        >
          {labels.map((r) => (
            <MenuItem value={r} selected={r === label}>
              {r}
            </MenuItem>
          ))}
        </Select>
        <Divider sx={{ paddingTop: '5px;' }} />
        <Stack component={'div'} spacing={1}>
          {entities.map((r) => {
            return (
              <Button
                id={r.id}
                fullWidth
                sx={{
                  padding: '15px;',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
                onClick={handleOpenEntity}
              >
                {r.id}
              </Button>
            );
          })}
        </Stack>
      </Grid>
      <Grid item xs sx={{ paddingLeft: '15px;' }}>
        <Stack>
          <Grid container>
            <Paper sx={{ width: '100%', padding: '2px;' }}>
              <Stack direction={'row'}>
                <Button color="primary" aria-label="Delete">
                  <SaveIcon></SaveIcon> Save
                </Button>
                <Button color="primary" aria-label="Save">
                  <DeleteIcon></DeleteIcon> Delete
                </Button>
                <Button>Find Similar</Button>
                <Button>Merge</Button>
              </Stack>
            </Paper>
          </Grid>
          <Grid container paddingTop={2}>
            <Grid item xs={2}>
              <InputLabel variant="standard">ID</InputLabel>
            </Grid>
            <Grid item>{selected.id}</Grid>
          </Grid>
          <Grid container>
            <Grid item xs={2}>
              <InputLabel variant="standard">Labels</InputLabel>
            </Grid>
            <Grid item>
              {selected.labels.map((r) => {
                return <Typography>{r}</Typography>;
              })}
            </Grid>
          </Grid>
          <Divider sx={{ paddingTop: '15px;', paddingBottom: '5px;' }}>
            Attributes
          </Divider>
          {selected.attributes.map((r) => {
            return (
              <Grid container>
                <Grid item xs={2}>
                  <InputLabel variant="standard">{r.key}</InputLabel>
                </Grid>
                <Grid item>
                  <TextField variant="standard" value={r.value}></TextField>
                </Grid>
              </Grid>
            );
          })}
          <Divider sx={{ paddingTop: '15px;', paddingBottom: '5px;' }}>
            Relations
          </Divider>
          <Grid container sx={{ paddingTop: '5px;' }}>
            <Grid item xs={3}>
              <InputLabel variant="standard">
                Depth of related entities
              </InputLabel>
            </Grid>
            <Grid item>
              <TextField
                variant="standard"
                value={depth}
                onChange={(e) => setDepth(e.currentTarget.value)}
              />
            </Grid>
            <Grid item>
              <Button onClick={handleRelationships}>
                Get Relations <LinkIcon />
              </Button>
            </Grid>
            <Grid xs textAlign={'right'} paddingRight={3}>
              <Typography>
                <Switch
                  checked={showGraph}
                  onChange={handleGraphShow}
                  aria-label="Show Graph"
                ></Switch>
                Show Graph
              </Typography>
            </Grid>
          </Grid>
          <Grid container sx={{ paddingTop: '5px;' }}>
            <Box display={showGraph ? 'none' : ''}>
              <RelationTable
                entities={allEntities}
                relations={relations}
              ></RelationTable>
            </Box>
            <Box display={showGraph ? '' : 'none'}>
              <RelationGraph></RelationGraph>
            </Box>
          </Grid>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default Nodes;
