import React from 'react';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { isAlert, getSuccessMessage } from '../../selectors';
import { hideAlert } from '../../actions/app';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AlertSuccess = (props) => {
  const { showAlert, hideAlertAction, successMessage } = props;

  return (
    <Snackbar open={showAlert} autoHideDuration={3000} onClose={hideAlertAction}>
      <Alert onClose={hideAlertAction} severity="success">
        {successMessage}
      </Alert>
    </Snackbar>
  );
};

const mapStateToProps = (state) => ({
  showAlert: isAlert(state),
  successMessage: getSuccessMessage(state),
});

const mapDispatchToProps = (dispatch) => ({
  hideAlertAction: () => dispatch(hideAlert()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlertSuccess);
