import React from 'react';
import { useSelector } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import RequestList from './RequestList';
import { getRequests, isUserAdmin, getUpdates } from '../../../store/selectors';
import { getDefaultTabOpen } from '../../../utils';
import useStyles from '../../styles';

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
  const {
    children, value, index, ...other
  } = props;
    const classes = useStyles();


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
      <Box className={`${classes.pdt5} ${classes.pdb5} `} style={{height: '70vh'}} p={3}>
        <Typography >{children}</Typography>
      </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const classes = useStyles();
  const requests = useSelector((state) => getRequests(state));
  const isAdmin = useSelector((state) => isUserAdmin(state));
  const pending = requests.filter((request) => request.status === 'pending');
  const progress = requests.filter((request) => request.status === 'progress');
  const done = requests.filter((request) => request.status === 'done');
  const updates = useSelector((state) => getUpdates(state));
  const { statuses } = updates;
  const pendingCount = statuses.pending.length > 0 ? `(${statuses.pending.length})` : '';
  const progressCount = statuses.progress.length > 0 ? `(${statuses.progress.length})` : '';
  const doneCount = statuses.done.length > 0 ? `(${statuses.done.length})` : '';

  const [value, setValue] = React.useState(isAdmin ? 1 : getDefaultTabOpen(statuses));

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} variant="fullWidth" centered className={classes.backgroundHeader} TabIndicatorProps={{style: {background:'#4AA0D7'}}}>
          <Tab className={classes.descriptionFont} label={`Pending ${pendingCount}`} {...a11yProps(0)} />
          <Tab className={classes.descriptionFont} label={`In Progress ${progressCount}`} {...a11yProps(1)} />
          <Tab className={classes.descriptionFont} label={`Done ${doneCount}`} {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <RequestList requests={pending} slug="pending" />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <RequestList requests={progress} slug="progress" />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <RequestList requests={done} slug="done" />
      </TabPanel>
    </div>
  );
}
