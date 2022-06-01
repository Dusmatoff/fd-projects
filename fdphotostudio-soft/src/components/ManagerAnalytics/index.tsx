import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import GradeIcon from '@material-ui/icons/Grade';
import First from './First';
import Second from './Second';
import { fetchManagerAnalytics } from '../../store/actions/managerAnalytics';
import { isUserLocManager, isManagerAnalyticsFetched } from '../../store/selectors';

interface TabPanelProps {
    // eslint-disable-next-line react/require-default-props
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
  const dispatch = useDispatch();

  const isDataFetched = useSelector((state) => isManagerAnalyticsFetched(state));
  const isLocManager = useSelector((state) => isUserLocManager(state));

  const [value, setValue] = React.useState(isLocManager ? 1 : 0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(fetchManagerAnalytics());
  }, []);

  return (
    isDataFetched
      && (
      <div>
        <AppBar position="static" color="secondary">
          <Tabs value={value} onChange={handleChange} centered>
            <Tab icon={<GradeIcon />} label="List data by Locations/Date" {...a11yProps(0)} />
            {!isLocManager && <Tab icon={<GradeIcon />} label="Location Managers" {...a11yProps(1)} />}
          </Tabs>
        </AppBar>
        {!isLocManager && (
        <TabPanel value={value} index={0}>
          <First />
        </TabPanel>
        )}
        <TabPanel value={value} index={1}>
          <Second />
        </TabPanel>
      </div>
      )
  );
};

export default RatingsTab;
