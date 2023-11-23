import {
  Stack,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Tabs,
  Tab,
} from '@mui/material';

import { useLocation, useNavigate } from 'react-router-dom';
import GeneralTab from './data-tabs/general-tab/GeneralTab';
import { MouseEvent, SyntheticEvent, useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';
import { EntityModel } from '../../models/Entity.Model';
import Nodes from './data-tabs/nodes/Nodes';
import { environment } from 'apps/research-ui/src/environments/environment';

const client = axios.create({
  baseURL: environment.VAULT_URL,
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export function Vault() {
  const search = useLocation().search;

  const id = new URLSearchParams(search).get('id') ?? '';

  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const initialState: EntityModel[] = [];

  const [entities, setEntities] = useState(initialState);
  useEffect(() => {
    getCaseFile(id);
  }, [id]);

  function getCaseFile(id: string): void {
    client
      .get(id)
      .then((response) => {
        const files = response.data;
        setEntities(files);
      })
      .catch((response) => alert(response));
  }

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function handleHome(event: MouseEvent<HTMLButtonElement>): void {
    navigate('/');
  }
  return (
    <Stack flexDirection={'column'}>
      <Box paddingBottom={3}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleHome}
            >
              <MenuIcon />
            </IconButton>

            <Typography>Case Details</Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="General" {...a11yProps(0)} />
        <Tab label="Entities" {...a11yProps(1)} />
        <Tab label="Relationship" {...a11yProps(2)} />
        <Tab label="Linked Cases **" {...a11yProps(2)} />
        <Tab label="Analysis" {...a11yProps(2)} />
        <Tab label="Report" {...a11yProps(2)} />
        <Tab label="Case Summary **" {...a11yProps(2)} />
      </Tabs>

      <CustomTabPanel value={value} index={0}>
        <GeneralTab identifier={id} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Nodes entities={entities} identifier={id} />
      </CustomTabPanel>
    </Stack>
  );
}

export default Vault;
