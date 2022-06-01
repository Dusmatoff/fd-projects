import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import HelpOutline from '@material-ui/icons/HelpOutline';
import ClientTab from './Client';
import ActivityTab from './Activity';
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
      {value === index && (<Typography>{children}</Typography>)}
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
  const classes = useStyles();
  const [activeTab, setActiveTab] = React.useState(0);

  const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <AppBar position="static" color="default" className={classes.paddingClientInfo}>
        <Tabs
          value={activeTab}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          onChange={handleChangeTab}
        >
          <Tab
            icon={<span className={classes.inlineIcon}><AccountCircle /></span>}
            label={<span className={classes.tabLabel}>CLIENT INFO</span>}
            {...a11yProps(0)}
          />
          <Tab
            icon={<span className={classes.inlineIcon}><HelpOutline /></span>}
            label={<span className={classes.tabLabel}>BOOKING ACTIVITY</span>}
            {...a11yProps(1)}
          />
        </Tabs>
      </AppBar>
      <div className={`${classes.pdT5} ${classes.pdR5}`}>
        <TabPanel value={activeTab} index={0}>
          <ClientTab />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <ActivityTab />
        </TabPanel>
      </div>
    </>
  );
};

export default TabsBlock;
