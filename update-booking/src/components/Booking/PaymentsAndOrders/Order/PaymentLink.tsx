import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Close from '@material-ui/icons/Close';
import { BlueButton } from '../../../buttons';
import {
  getCart, getClient, getBooking,
} from '../../../../selectors';
import { sendPaymentLink, clearCart } from '../../../../actions/app';
import useStyles from '../../../styles';

const PaymentLink = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const {
    open, setShowPaymentLinkModal, setShowCartModal,
  } = props;

  const client = useSelector((state) => getClient(state));
  const booking = useSelector((state) => getBooking(state));

  const totalRate = Number(booking?.calcObj.total_rate);

  const cart = useSelector((state) => getCart(state));

  /* SEND PAYMENT LINK */
  const validationSchema = Yup.object().shape({
    paymentEmail: Yup.string().email().required(),
  });

  const initialValues = {
    cart: '',
    paymentEmail: client.email,
    sendPaymentNote: '',
    clientId: client.id,
    amount: totalRate,
    insertBookingLog: 1,
    bookingId: booking.id,
  };
  /* SEND PAYMENT LINK */

  return (
    <>
      <Dialog className={classes.dialogWindow} maxWidth="md" fullWidth open={open} onClose={() => setShowPaymentLinkModal(false)}>
        <DialogTitle className={classes.textCenter}>
          <Typography variant="h4">Send payment link</Typography>
          <IconButton aria-label="close" className={`${classes.closeButton} positionAbsolute`} onClick={() => setShowPaymentLinkModal(false)}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.pdContent}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              if (cart.items.length !== 0) {
                values.cart = cart;

                Promise.resolve(dispatch(sendPaymentLink(values))).then(() => {
                  dispatch(clearCart());
                  setShowPaymentLinkModal(false);
                  setShowCartModal(false);
                  actions.resetForm();
                });
              } else {
                alert('Please add product in shop');
              }
            }}
          >
            {(formikProps) => (
              <form onSubmit={formikProps.handleSubmit}>
                <TextField
                  name="paymentEmail"
                  label="Notify email"
                  type="text"
                  InputLabelProps={{ shrink: true }}
                  value={formikProps.values.paymentEmail}
                  onChange={formikProps.handleChange}
                  onBlur={formikProps.handleBlur}
                  error={formikProps.touched.paymentEmail && Boolean(formikProps.errors.paymentEmail)}
                  helperText={formikProps.touched.paymentEmail && formikProps.errors.paymentEmail}
                  className={classes.mb10}
                  fullWidth
                />
                <TextField
                  className={`${classes.width100} ${classes.mt10} ${classes.mb10}`}
                  name="sendPaymentNote"
                  label="Note"
                  InputLabelProps={{ shrink: true }}
                  multiline
                  rows={1}
                  variant="outlined"
                  value={formikProps.values.sendPaymentNote}
                  onChange={formikProps.handleChange}
                  onBlur={formikProps.handleBlur}
                  error={formikProps.touched.sendPaymentNote && Boolean(formikProps.errors.sendPaymentNote)}
                />
                <BlueButton variant="contained" type="submit" disabled={formikProps.isSubmitting}>
                  Send
                </BlueButton>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PaymentLink;
