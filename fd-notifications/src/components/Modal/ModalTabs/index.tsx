import React, {FC} from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Newspaper from '@mui/icons-material/Newspaper';
import FilePresent from '@mui/icons-material/FilePresent';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PostsList from './PostsList';
import SinglePost from './SinglePost';
import DocsTab from './DocsTab';
import {useAppSelector, useAppDispatch} from '../../../store/hooks';
import {selectReadPost, clearSinglePost, selectUser} from '../../../store/appSlice';
import {selectNews, selectUnreadeds, selectForManagers} from '../../../store/postsSlice';
import useStyles from '../../styles';

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 1}} >
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const ModalTabs: FC = () => {
    const dispatch = useAppDispatch();
    const classes = useStyles();

    const user = useAppSelector(selectUser);
    const showManagerTab = ('loc_manager' in user.caps) || ('manager' in user.caps) || ('administrator' in user.caps);
    const readPost = useAppSelector(selectReadPost);
    const news = useAppSelector(selectNews);
    const forManagers = useAppSelector(selectForManagers);
    const unreadeds = useAppSelector(selectUnreadeds);

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        dispatch(clearSinglePost());
    };

    return (
        <React.Fragment>
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    className={classes.backgroundHeader} TabIndicatorProps={{style: {background:'#4AA0D7'}}}
                    textColor="inherit"
                    variant="fullWidth"

                >
                    <Tab icon={<Newspaper/>} iconPosition="start" label={`News (${unreadeds[0]})`} {...a11yProps(0)} />
                    <Tab icon={<FilePresent/>}
                         iconPosition="start"
                         label={`Docs (${unreadeds[1]})`}
                         {...a11yProps(1)}/>
                    {showManagerTab && <Tab icon={<AccountCircle/>}
                                                iconPosition="start"
                                                label={`For Managers (${unreadeds[2]})`}
                                                {...a11yProps(2)} />
                    }
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                {readPost ? <SinglePost/> : <PostsList posts={news} isDocs={false}/>}
            </TabPanel>
            <TabPanel value={value} index={1}>
                <DocsTab/>
            </TabPanel>
            {showManagerTab &&
            <TabPanel value={value} index={2}>
                {readPost ? <SinglePost/> : <PostsList posts={forManagers} isDocs={false}/>}
            </TabPanel>
            }
        </React.Fragment>
    );
}

export default ModalTabs;
