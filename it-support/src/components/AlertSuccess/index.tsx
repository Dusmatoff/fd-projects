import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { isAlert, getSuccessMessage } from '../../store/selectors';
import { hideAlert } from '../../store/actions/app';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AlertSuccess = () => {
  const dispatch = useDispatch();
  const showAlert = useSelector((state) => isAlert(state));
  const successMessage = useSelector((state) => getSuccessMessage(state));

  return (
    <Snackbar open={showAlert} onClose={() => dispatch(hideAlert())} autoHideDuration={3000} style={{ position: 'fixed' }}>
      <Alert onClose={() => dispatch(hideAlert())} severity="success" style={{width: '140px', display: 'flex', justifyContent: 'space-between', borderRadius: '5px'}}>
        <div style={{marginLeft: '28px'}} dangerouslySetInnerHTML={{ __html: successMessage }} />
      </Alert>
    </Snackbar>
  );
};

export default AlertSuccess;
