import React from 'react';
import { connect } from 'react-redux';
import {
  createStyles, Theme, withStyles, WithStyles,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {
  isShowCreateNewClientModal, getCreateClientContent, getClient, getBookingId,
} from '../../selectors';
import { hideCreateClientModal } from '../../actions/app';
import { createClientFromBooking, attachClientId } from '../../actions/booking';

const styles = (theme: Theme) => createStyles({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

export interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const {
    children, classes, onClose, ...other
  } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={`${classes.closeButton} positionAbsolute`} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
}))(MuiDialogContent);

const CustomizedDialogs = (props) => {
  const {
    showCreateNewClientModal,
    createClientContent,
    hideCreateClientModalAction,
    createClientFromBookingAction,
    attachClientIdAction,
    bookingId,
    client,
  } = props;

  const generateClientContent = Object.keys(createClientContent).map((item) => (
    <p>
      <Button
        variant="contained"
        size="small"
        key={item}
        onClick={() => attachClientIdAction(bookingId, createClientContent[item].id)}
      >
        ID:
        {createClientContent[item].id}
        {' '}
        {createClientContent[item].name}
        {' '}
        {createClientContent[item].email}
        {' '}
        {createClientContent[item].phone}
        {' '}
        Finded By:
        {createClientContent[item].finded_by}
      </Button>
    </p>
  ));

  const clientInfo = ` ${client.name} ${client.email} ${client.phone} `;

  return (
    <Dialog onClose={hideCreateClientModalAction} aria-labelledby="customized-dialog-title" open={showCreateNewClientModal}>
      <DialogTitle id="customized-dialog-title" onClose={hideCreateClientModalAction}>
        Create New Client
      </DialogTitle>
      <DialogContent dividers>
        {Object.keys(createClientContent).length !== 0 ? (
          <Typography gutterBottom>
            There are clients with similar parameter. Please choose one of them to attach:
          </Typography>
        ) : ''}

        {Object.keys(createClientContent).length !== 0 ? generateClientContent : ''}

        <Typography gutterBottom>
          <br />
          {Object.keys(createClientContent).length !== 0 ? 'Or create New Client:' : 'Create New Client:'}
          <br />
          <b>{clientInfo}</b>
          <br />
          and attach to Booking?
        </Typography>

        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={() => createClientFromBookingAction(bookingId)}
        >
          Create New Client and Attach to Booking
        </Button>
      </DialogContent>
    </Dialog>
  );
};

const mapStateToProps = (state) => ({
  showCreateNewClientModal: isShowCreateNewClientModal(state),
  createClientContent: getCreateClientContent(state),
  client: getClient(state),
  bookingId: getBookingId(state),
});

const mapDispatchToProps = (dispatch) => ({
  hideCreateClientModalAction: () => dispatch(hideCreateClientModal()),
  createClientFromBookingAction: (bookingId) => dispatch(createClientFromBooking(bookingId)),
  attachClientIdAction: (bookingId, clientId) => dispatch(attachClientId(bookingId, clientId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomizedDialogs);
