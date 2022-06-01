import React, {FC} from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert'
import {useAppSelector, useAppDispatch} from '../../store/hooks';
import {selectError, hideError, selectErrorMessage} from '../../store/appSlice';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AlertError: FC = () => {
    const dispatch = useAppDispatch();
    const open = useAppSelector(selectError);
    const errorMessage = useAppSelector(selectErrorMessage);

    return (
        <Snackbar open={open} autoHideDuration={4000} onClose={() => dispatch(hideError())} anchorOrigin={{horizontal: "center", vertical: "bottom"}}>
            <Alert onClose={() => dispatch(hideError())} severity="error" sx={{width: '100%'}}>
                {errorMessage}
            </Alert>
        </Snackbar>
    );
}

export default AlertError;
