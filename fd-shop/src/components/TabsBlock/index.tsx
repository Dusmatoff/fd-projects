import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ViewList from '@material-ui/icons/ViewList';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import ListAlt from '@material-ui/icons/ListAlt';
import Categories from './Categories/index.jsx';
import Products from './Products/index.jsx';
import Orders from './Orders/index.jsx';
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

const TabsBlock = (props) => {
  const classes = useStyles();
  const { pageId } = props;
  let defaultTabIndex = 0;

  switch (pageId) {
    case 'fd-shop-orders':
      defaultTabIndex = 1;
      break;
    case 'fd-shop-categories':
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
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered className={classes.backgroundHeader} TabIndicatorProps={{style: {background:'#4AA0D7'}}}>
          <Tab icon={<ViewList />} label="PRODUCTS" {...a11yProps(0)} />
          <Tab icon={<ShoppingCart />} label="ORDERS" {...a11yProps(1)} />
          <Tab icon={<ListAlt />} label="CATEGORIES" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Products />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Orders />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Categories />
      </TabPanel>
    </div>
  );
};

export default TabsBlock;
