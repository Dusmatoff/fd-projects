import React, {FC} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import ModalTabs from './ModalTabs';
import AlertSuccess from '../AlertSuccess';
import AlertError from '../AlertError';
import Loader from '../Loader';
import {useAppSelector} from '../../store/hooks';
import {selectUser} from '../../store/appSlice';
import {selectUnreadedsCount} from '../../store/postsSlice';
import {IModalTabs} from '../../store/interfaces';
import useStyles from '../styles';

const Modal: FC<IModalTabs> = ({open, onClick}) => {
    const classes = useStyles();

    const user = useAppSelector(selectUser);
    const unreadedsCount = useAppSelector(selectUnreadedsCount);

    return (
        <Dialog
            open={open}
            maxWidth="xl"
            fullWidth
            className={classes.modalRoot}
        >
            <DialogTitle className={classes.modalTitle}>
                <Typography variant="h5" >
                    Hi, {user.data.display_name}. You have {unreadedsCount} unread posts.
                </Typography>
                <CloseIcon className={classes.closeButton} onClick={onClick}/>
            </DialogTitle>
            <DialogContent className={classes.minHeight}>
                <ModalTabs/>
                <AlertSuccess/>
                <AlertError/>
                <Loader/>
            </DialogContent>
        </Dialog>
    );
}

export default Modal;
