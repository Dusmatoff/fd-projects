import React from 'react';
import { connect } from 'react-redux';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { isError, getErrorMessage } from '../../selectors';
import { hideError } from '../../actions/app';
import useStyles from '../styles';

const ErrorModal = (props) => {
  const classes = useStyles();

  const { showError, errorMessage, hideErrorAction } = props;
  const message = errorMessage || 'Something has gone terribly wrong. Please try again.';

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={showError}
      onClose={hideErrorAction}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={showError}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          <div dangerouslySetInnerHTML={{ __html: message }} />
        </Alert>
      </Fade>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  showError: isError(state),
  errorMessage: getErrorMessage(state),
});

const mapDispatchToProps = (dispatch) => ({
  hideErrorAction: () => dispatch(hideError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorModal);
