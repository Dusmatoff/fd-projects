import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import GradeIcon from '@material-ui/icons/Grade';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import CancelIcon from '@material-ui/icons/Cancel';
import TopBooked from './topBooked';
import TopDone from './topDone';
import TopCancelled from './topCancelled';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const RatingsTab = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static" color="secondary">
        <Tabs value={value} onChange={handleChange} centered>
          <Tab icon={<GradeIcon />} label="TOP BOOKED" {...a11yProps(0)} />
          <Tab icon={<QueryBuilderIcon />} label="TOP HOURS" {...a11yProps(1)} />
          <Tab icon={<CancelIcon />} label="TOP CANCELLED" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <TopBooked />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TopDone />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TopCancelled />
      </TabPanel>
    </div>
  );
};

export default RatingsTab;
