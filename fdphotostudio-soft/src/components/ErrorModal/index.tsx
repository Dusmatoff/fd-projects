import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { isError, getErrorMessage } from '../../store/selectors';
import { hideError } from '../../store/actions/app';
import useStyles from '../styles';

const ErrorModal = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const showError = useSelector((state) => isError(state));
  const errorMessage = useSelector((state) => getErrorMessage(state));

  const message = errorMessage || 'Something has gone terribly wrong. Please try again.';

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={showError}
      onClose={() => dispatch(hideError())}
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

export default ErrorModal;
