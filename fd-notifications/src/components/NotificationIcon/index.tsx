import React, {FC} from 'react';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {IIcon} from '../../store/interfaces';
import useStyles from '../styles';
import colors from '../../../../../../colors';

const NotificationIcon: FC<IIcon> = ({unreadedCount, onClick}) => {
    const classes = useStyles();

    return (
        <div className={classes.icon} onClick={onClick}>
            <Badge badgeContent={unreadedCount} color="secondary">
                <NotificationsIcon fontSize="large" style={{color: colors.color201 }}/>
            </Badge>
        </div>
    );
}

export default NotificationIcon;
