import React from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Close from '@material-ui/icons/Close';
import { WhiteButton, BlueButton } from '../../buttons';
import { getBookingId, getTransactions } from '../../../selectors';
import { addRefund, fetchTransactions } from '../../../actions/transactions';
import { errorMessages } from '../../../utils';
import useStyles from '../../styles';

const RequestRefund = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const bookingId = useSelector((state) => getBookingId(state));
  const transactions = useSelector((state) => getTransactions(state));

  const [showModal, setShowModal] = React.useState(false);
  const toggleModal = () => setShowModal(!showModal);

  const { refund_requests: refundRequests } = transactions;

  /* FORMIK */
  const validationSchema = Yup.object().shape({
    amount: Yup.number().min(1).required(),
    reason: Yup.string().min(3).required(),
  });

  const initialValues = { appId: bookingId, amount: '', reason: '' };
  /* FORMIK */

  return (
    <>
      <WhiteButton
        variant="contained"
        onClick={toggleModal}
        className={classes.mb15}
      >
        Request refund
      </WhiteButton>
      <Dialog onClose={toggleModal} open={showModal}>
        <DialogTitle id="customized-dialog-title">
          <Typography variant="h6">Request refund</Typography>
          <IconButton aria-label="close" className={`${classes.closeButton} positionAbsolute`} onClick={toggleModal}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.padding}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={(values) => {
              Promise.resolve(dispatch(addRefund(values)))
                .then(() => {
                  dispatch(fetchTransactions(bookingId));
                  toggleModal();
                });
            }}
          >
            {(formikProps) => (
              <form onSubmit={formikProps.handleSubmit}>
                <TextField
                  className={`${classes.width100} ${classes.mb15}`}
                  name="amount"
                  label="Amount"
                  type="number"
                  InputLabelProps={{ shrink: true }}
                  value={formikProps.values.amount}
                  onChange={formikProps.handleChange}
                  onBlur={formikProps.handleBlur}
                  error={formikProps.touched.amount && Boolean(formikProps.errors.amount)}
                  helperText={formikProps.touched.amount && formikProps.errors.amount}
                />
                <TextField
                  className={`${classes.width100} ${classes.mb15}`}
                  name="reason"
                  label="Reason"
                  multiline
                  rows={3}
                  InputLabelProps={{ shrink: true }}
                  value={formikProps.values.reason}
                  onChange={formikProps.handleChange}
                  onBlur={formikProps.handleBlur}
                  error={formikProps.touched.reason && Boolean(formikProps.errors.reason)}
                  helperText={formikProps.touched.reason && formikProps.errors.reason}
                />
                <BlueButton variant="contained" type="submit" fullWidth>
                  Submit
                </BlueButton>
              </form>
            )}
          </Formik>
          <br />
          {refundRequests.length > 0 && (
            <TableContainer component={Paper}>
              <Table size="small" padding="checkbox">
                <TableHead>
                  <TableRow>
                    <TableCell>Amount</TableCell>
                    <TableCell>Reason</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Created</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {refundRequests.map((row) => (
                    <TableRow key={row.created}>
                      <TableCell>{row.amount}</TableCell>
                      <TableCell>{row.reason}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>{moment(row.created).format('M/DD/YYYY')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RequestRefund;
