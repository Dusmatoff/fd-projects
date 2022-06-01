import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import List from '@material-ui/icons/List';
import LocalMall from '@material-ui/icons/LocalMall';
import PurchaseList from './PurchaseList/index.jsx';
import Types from './Types/index.jsx';
import Vendors from './Vendors/index.jsx';
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
      <Box p={1}>
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

const TabsBlock = (props) => {
  const { pageId, user } = props;
  const classes = useStyles();

  const showOtherTabs = !('worker' in user.capabilities);

  let defaultTabIndex = 0;

  switch (pageId) {
    case 'fd-purchase-types':
      defaultTabIndex = 1;
      break;
    case 'fd-purchase-vendors':
      defaultTabIndex = 2;
      break;
    default:
      defaultTabIndex = 0;
  }

  const [value, setValue] = React.useState(defaultTabIndex);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} centered className={classes.backgroundHeader} TabIndicatorProps={{style: {background:'#4AA0D7'}}}>
          <Tab icon={<AddShoppingCart />} label="PURCHASE LIST" {...a11yProps(0)} />
          {showOtherTabs && <Tab icon={<List />} label="TYPES" {...a11yProps(2)} />}
          {showOtherTabs && <Tab icon={<LocalMall />} label="VENDORS" {...a11yProps(3)} />}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <PurchaseList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        {showOtherTabs && <Types />}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {showOtherTabs && <Vendors />}
      </TabPanel>

    </div>
  );
};

export default TabsBlock;
