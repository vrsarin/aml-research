import { useEffect, useState } from 'react';
import { Divider, Grid, InputLabel, MenuItem, Select } from '@mui/material';

import { EntityModel } from 'apps/research-ui/src/app/models/Entity.Model';
import axios from 'axios';
import { environment } from 'apps/research-ui/src/environments/environment';

export interface NodedProperties {
  identifier: string;
  entities: EntityModel[] | undefined;
}

const client = axios.create({
  baseURL: environment.GRAPH_URL,
});
export function Nodes(props: NodedProperties) {
  const [label, setLabel] = useState('');
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    getLabels(props.identifier);
    if (label === '') {
      setLabel(labels[0]);
    }
  }, [label, labels, props.identifier]);

  const getLabels = (id: string) => {
    client
      .get(`${id}/knowledge/graph/labels`)
      .then((response) => {
        setLabels(response.data);
      })
      .catch((response) => alert(response));
  };
  
  return (
    <Grid container flexWrap={'nowrap'} direction={'row'} flexDirection={'row'}>
      <Grid item>
        <InputLabel variant="standard">Labels</InputLabel>
        <Select
          value={label}
          label="Labels"
          onChange={(e, n) => setLabel(e.target.value)}
          fullWidth
        >
          {labels.map((r) => (
            <MenuItem value={r}>{r}</MenuItem>
          ))}
        </Select>
        <Divider sx={{ paddingTop: '5px;' }} />
      </Grid>
      <Grid item xs></Grid>
    </Grid>
  );
}

export default Nodes;
