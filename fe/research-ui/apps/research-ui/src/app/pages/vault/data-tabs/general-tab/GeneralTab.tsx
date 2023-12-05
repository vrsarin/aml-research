import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Chip,
  Divider,
  Fab,
  Grid,
  IconButton,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import {
  CaseFileModel,
  CaseStatus,
} from 'apps/research-ui/src/app/models/Vault.Model';
import { environment } from 'apps/research-ui/src/environments/environment';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const client = axios.create({
  baseURL: environment.VAULT_URL,
});
const names = [
  'Taxonomy 1',
  'Taxonomy 2',
  'Taxonomy 3',
  'Taxonomy 4',
  'Taxonomy 5',
  'Taxonomy 6',
  'Taxonomy 7',
  'Taxonomy 8',
  'Taxonomy 9',
  'Taxonomy 10',
];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export interface GeneralTabProps {
  identifier: string;
}

export function GeneralTab(props: GeneralTabProps) {
  const initialState: CaseFileModel = {
    vaultId: '',
    status: CaseStatus.Open,
    name: '',
    description: '',
  };
  const theme = useTheme();
  const [caseFile, setCaseFile] = useState(initialState);

  const [personName, setPersonName] = useState<string[]>([
    'Taxonomy 1',
    'Taxonomy 2',
  ]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

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

  function handleDelete(event: any): void {
    alert('deleted');
  }

  return (
    <Box paddingBottom={0.5}>
      <Box padding={2}>
        <Typography>Case #: {caseFile.vaultId}</Typography>
      </Box>
      <Box padding={1}>
        <TextField
          label="Display Name"
          value={caseFile.name}
          sx={{ minWidth: '200px;' }}
          fullWidth
          variant="filled"
        />
      </Box>
      <Box padding={1}>
        <TextField
          label="Short Description"
          value={caseFile.description}
          fullWidth
          variant="filled"
        />
      </Box>
      <Divider textAlign="left">Taxonomy</Divider>
      <Grid
        container
        sx={{
          paddingTop: '5px;',
          paddingBottom: '5px;',
          paddingRight: '20px;',
        }}
      >
        <Grid item xs>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            label="Taxonomy"
            multiple
            sx={{ minWidth: '250px;' }}
            fullWidth
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Taxonomy" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} onDelete={handleDelete} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, personName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item sx={{ paddingLeft: '25px;' }}>
          <Fab size="small" color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>

      <Divider textAlign="left">Tags</Divider>
      <Box
        flexDirection={'row'}
        alignItems={'flex-end'}
        alignContent={'flex-end'}
        textAlign={'end'}
      >
        <Stack>
          <Grid container>
            <Grid item xs={4} textAlign={'center'}>
              <Paper sx={{ backgroundColor: 'lightslategray', color: 'white' }}>
                Key
              </Paper>
            </Grid>
            <Grid item xs textAlign={'center'}>
              <Paper sx={{ backgroundColor: 'lightslategray', color: 'white' }}>
                Value
              </Paper>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={4} textAlign={'center'}>
              <TextField variant="filled" fullWidth value={'Tag1'} />
            </Grid>
            <Grid item xs textAlign={'center'}>
              <TextField variant="filled" fullWidth value={'Tag Value1'} />
            </Grid>
            <Grid
              item
              textAlign={'center'}
              alignItems={'center'}
              alignContent={'center'}
            >
              <IconButton color="primary" aria-label="Save">
                <SaveIcon />
              </IconButton>
              <IconButton color="primary" aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={4} textAlign={'center'}>
              <TextField variant="filled" fullWidth value={'Tag2'} />
            </Grid>
            <Grid item xs textAlign={'center'}>
              <TextField variant="filled" fullWidth value={'Tag Value2'} />
            </Grid>
            <Grid
              item
              textAlign={'center'}
              alignItems={'center'}
              alignContent={'center'}
            >
              <IconButton color="primary" aria-label="Save">
                <SaveIcon />
              </IconButton>
              <IconButton color="primary" aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={4} textAlign={'center'}>
              <TextField fullWidth variant="standard" />
            </Grid>
            <Grid item xs textAlign={'center'}>
              <TextField fullWidth variant="standard" />
            </Grid>
            <Grid
              item
              textAlign={'center'}
              alignItems={'center'}
              alignContent={'center'}
            >
              <IconButton color="primary" aria-label="Save">
                <SaveIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </Box>
  );
}

export default GeneralTab;
