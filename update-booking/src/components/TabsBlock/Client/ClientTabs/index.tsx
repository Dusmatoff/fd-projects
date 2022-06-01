import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Packages from './Packages';
import UpcomingBookings from './UpcomingBookings';
import Contacts from './Contacts';
import RedFlags from './RedFlags';
import useStyles from '../../../styles';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
  const classes = useStyles();

  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      className={`${classes.pdL5} ${classes.pdR5}`}
      {...other}
    >
      {value === index && (<div>{children}</div>)}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const ClientTabs = ({ data, client }) => {
  const classes = useStyles();

  const { blacklist, negativeBalance, deposit100 } = data.values;

  const activeTabIndex = blacklist || negativeBalance || deposit100 ? 2 : 0;

  const [activeTab, setActiveTab] = React.useState(activeTabIndex);

  const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <AppBar position="static" color="default" className={classes.mt5}>
        <Tabs
          value={activeTab}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          onChange={handleChangeTab}
        >
          <Tab label={<span className={classes.tabLabel}>Packages & Upcoming bookings</span>} {...a11yProps(0)} />
          <Tab label={<span className={classes.tabLabel}>Emails and phones</span>} {...a11yProps(1)} />
          <Tab
            label={<span className={classes.tabLabel}>Red Flags</span>}
            {...a11yProps(2)}
            className={(blacklist || negativeBalance || deposit100) && classes.bgPink}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={activeTab} index={0}>
        <Grid container spacing={1} justify="space-between">
          <Grid item xs={12} lg={7}>
            <Packages />
          </Grid>
          <Grid item xs={12} lg={5}>
            <UpcomingBookings client={client} />
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <Contacts data={data} />
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        <RedFlags data={data} client={client} />
      </TabPanel>
    </>
  );
};

export default ClientTabs;
