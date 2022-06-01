import React, {FC, useState, useEffect} from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Icon from './components/NotificationIcon';
import Modal from './components/Modal';
import createGenerateClassName from '@mui/styles/createGenerateClassName';
import StylesProvider from '@mui/styles/StylesProvider';
import {useAppDispatch, useAppSelector} from './store/hooks';
import {fetchUser, selectUserId} from './store/appSlice';
import {fetchPosts, selectUnreadedsCount, selectInterval} from './store/postsSlice';
import {diffInMinutes} from './utils';


const notificationsClassName = createGenerateClassName({
    productionPrefix: 'notifications-jss',
    disableGlobal: false,
    seed: 'notifications',
});
const theme = createTheme({
    palette: {
        secondary: {
            main: '#ca4a1f',
        },warning: {
            main: '#38AF53',
        },

    },
});

const App: FC = () => {
    const dispatch = useAppDispatch();

    const userId = useAppSelector(selectUserId);
    const unreadedCount = useAppSelector(selectUnreadedsCount);
    const intervalInMinute = useAppSelector(selectInterval);
    const INTERVAL_KEY = 'fd-notifications-last-modal-open';

    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchUser());
    }, []);

    useEffect(() => {
        if (userId) {
            dispatch(fetchPosts());
        }
    }, [userId]);

    useEffect(() => {
        if (unreadedCount > 0 && intervalInMinute !== null) {
            const lastModalOpen = window.localStorage.getItem(INTERVAL_KEY);

            if (lastModalOpen) {
                const diff = diffInMinutes(lastModalOpen);
                if (diff > intervalInMinute) {
                    setOpen(true);
                    window.localStorage.setItem(INTERVAL_KEY, new Date().toString());
                }
            } else {
                setOpen(true);
                window.localStorage.setItem(INTERVAL_KEY, new Date().toString());
            }
        }
    }, [unreadedCount, intervalInMinute]);

    const handleClick = () => {
        setOpen(!open)
    }

    return (
        userId ?
            <StylesProvider generateClassName={notificationsClassName}>
                <ThemeProvider theme={theme}>
            <Icon unreadedCount={unreadedCount} onClick={handleClick}/>
            <Modal open={open} onClick={handleClick}/>
                </ThemeProvider>
        </StylesProvider> : null
    );
};

export default App;
