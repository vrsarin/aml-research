import { MouseEvent, SyntheticEvent, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import GeneralTab from './general-tab/GeneralTab';
import Nodes from '../../nodes/Nodes';
import { AppBar, IconButton, Stack, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

export interface TabsProps {
  identifier: string;
}
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

export function DataTabs(props: TabsProps) {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

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
        <Tab label="Analysis" {...a11yProps(2)} />
        <Tab label="Report" {...a11yProps(2)} />
      </Tabs>

      <CustomTabPanel value={value} index={1}>
        <GeneralTab identifier={props.identifier ?? ''} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {/* <Nodes identifier={props.identifier??''} /> */}
      </CustomTabPanel>
    </Stack>
  );
}

export default DataTabs;
