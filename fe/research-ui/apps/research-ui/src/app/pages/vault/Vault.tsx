import { Stack, Box, Typography, Tabs, Tab } from '@mui/material';
import { useLocation } from 'react-router-dom';
import GeneralTab from './data-tabs/general-tab/GeneralTab';
import { SyntheticEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { EntityModel } from '../../models/Entity.Model';
import Nodes from './data-tabs/nodes/Nodes';
import { environment } from 'apps/research-ui/src/environments/environment';
import Storage from './data-tabs/storage/Storage';

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

  return (
    <Stack flexDirection={'column'}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="General" {...a11yProps(0)} />
        <Tab label="Files" {...a11yProps(0)} />
        <Tab label="Entities" {...a11yProps(1)} />
        {/* <Tab label="Relationship" {...a11yProps(2)} /> */}
        <Tab label="Linked Cases **" {...a11yProps(2)} />
        <Tab label="Analysis" {...a11yProps(2)} />
        <Tab label="Report" {...a11yProps(2)} />
        <Tab label="Case Summary **" {...a11yProps(2)} />
      </Tabs>

      <CustomTabPanel value={value} index={0}>
        <GeneralTab identifier={id} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Storage identifier={id} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Nodes entities={entities} identifier={id} />
      </CustomTabPanel>
    </Stack>
  );
}

export default Vault;
