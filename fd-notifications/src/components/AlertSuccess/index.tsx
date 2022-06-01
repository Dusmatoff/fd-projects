import React, {FC} from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert'
import {useAppSelector, useAppDispatch} from '../../store/hooks';
import {selectSuccess, hideSuccess, selectSuccessMessage} from '../../store/appSlice';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AlertSuccess: FC = () => {
    const dispatch = useAppDispatch();
    const open = useAppSelector(selectSuccess);
    const successMessage = useAppSelector(selectSuccessMessage);

    return (
        <Snackbar open={open} autoHideDuration={4000} onClose={() => dispatch(hideSuccess())} anchorOrigin={{horizontal: "center", vertical: "bottom"}}>
            <Alert onClose={() => dispatch(hideSuccess())} severity="success" sx={{width: '100%'}}>
                {successMessage}
            </Alert>
        </Snackbar>
    );
}

export default AlertSuccess;
