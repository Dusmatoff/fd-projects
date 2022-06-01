import React from 'react';
import { useSelector } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import InsertPhoto from '@material-ui/icons/InsertPhoto';
import ViewList from '@material-ui/icons/ViewList';
import ListAlt from '@material-ui/icons/ListAlt';
import Assessment from '@material-ui/icons/Assessment';
import TimelineIcon from '@material-ui/icons/Timeline';
import Backdrops from './Backdrops/index.jsx';
import Items from './Items/index.jsx';
import Categories from './Categories/index.jsx';
import Reports from './Reports/index.jsx';
import DailyReports from './DailyReports/index.jsx';
import { isUserWorker } from '../../store/selectors';
import useStyles from '../styles';

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

const TabsBlock = () => {
  const isWorker = useSelector((state) => isUserWorker(state));
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} centered className={classes.backgroundHeader} TabIndicatorProps={{style: {background:'#4AA0D7'}}}>
          <Tab icon={<InsertPhoto />} label="BACKDROPS" {...a11yProps(0)} />
          <Tab icon={<ListAlt />} label="ITEMS" {...a11yProps(1)} />
          {!isWorker && <Tab icon={<ViewList />} label="CATEGORIES" {...a11yProps(2)} /> }
          {!isWorker && <Tab icon={<Assessment />} label="REPORTS" {...a11yProps(3)} /> }
          {!isWorker && <Tab icon={<TimelineIcon />} label="DAILY REPORTS" {...a11yProps(4)} /> }
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Backdrops />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Items />
      </TabPanel>
      {!isWorker
        && (
        <TabPanel value={value} index={2}>
          <Categories />
        </TabPanel>
        )}
      {!isWorker
        && (
        <TabPanel value={value} index={3}>
          <Reports />
        </TabPanel>
        )}
      {!isWorker
        && (
        <TabPanel value={value} index={4}>
          <DailyReports />
        </TabPanel>
        )}
    </div>
  );
};

export default TabsBlock;
