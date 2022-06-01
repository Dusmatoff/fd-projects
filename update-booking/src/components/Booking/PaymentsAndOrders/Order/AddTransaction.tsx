import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { fetchTransactions, addTransaction } from '../../../../actions/transactions';
import { clearCart } from '../../../../actions/app';
import {
  getBookingId,
  getBookingOption,
  getCart,
  getClient,
} from '../../../../selectors';
import { BlueButton } from '../../../buttons';
import useStyles from '../../../styles';

const AddTransaction = ({ toggleShopModal, setShowPayment }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const client = useSelector((state) => getClient(state));
  const bookingId = useSelector((state) => getBookingId(state));
  const bookingOption = useSelector((state) => getBookingOption(state));
  const cart = useSelector((store: any) => getCart(store));

  /* FORMIK */
  const validationSchema = Yup.object().shape({
    type: Yup.string().required(),
  });

  const initialValues = {
    cart: '',
    type: 'cash',
    shopkeep: 'paypal',
    transactionId: '',
    userId: client.id,
    userName: client.name,
    userEmail: client.email,
    userPhone: client.phone,
    bookingId,
    from: bookingOption.from,
  };
  /* FORMIK */

  const otherSites = ['peerspace', 'storefront', 'splacer', 'other'];

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={(values, actions) => {
        if (values.shopkeep === 'paypal' || values.shopkeep === 'venmo' || values.shopkeep === 'giggster') {
          if (values.type === 'card' && values.transactionId === '') {
            alert('Please add transaction ID');
            return;
          }
        }

        if (cart.items.length !== 0) {
          values.cart = cart;

          Promise.resolve(dispatch(addTransaction(values))).then(() => {
            dispatch(fetchTransactions(values.bookingId));
          }).then(() => {
            actions.resetForm();
            dispatch(clearCart());
            toggleShopModal();
            setShowPayment(false);
          });
        } else {
          alert('Please add product in shop');
        }
      }}
    >
      {(formikProps) => (
        <form onSubmit={formikProps.handleSubmit}>
          <Grid container spacing={1} justify="space-between" alignItems="center" className={classes.pdT10}>
            <Grid item xs={6}>
              <FormControl variant="outlined" className={classes.width100}>
                <InputLabel htmlFor="type">Type</InputLabel>
                <Select
                  name="type"
                  native
                  value={formikProps.values.type}
                  onChange={formikProps.handleChange}
                  label="Type"
                  inputProps={{
                    name: 'type',
                    id: 'type',
                  }}
                >
                  <option value="cash">cash</option>
                  <option value="card">card</option>
                </Select>
              </FormControl>
            </Grid>
            {formikProps.values.type === 'card' && (
            <>
              <Grid item xs={6}>
                <FormControl variant="outlined" className={classes.width100}>
                  <InputLabel htmlFor="shopkeep">From</InputLabel>
                  <Select
                    name="shopkeep"
                    native
                    value={formikProps.values.shopkeep}
                    onChange={formikProps.handleChange}
                    label="From"
                    inputProps={{ name: 'shopkeep', id: 'shopkeep' }}
                  >
                    {otherSites.includes(formikProps.values.from)
                                                    && (
                                                    <option value={formikProps.values.from}>
                                                      {formikProps.values.from.charAt(0).toUpperCase() + formikProps.values.from.slice(1)}
                                                    </option>
                                                    )}
                    <option value="paypal">Paypal</option>
                    <option value="venmo">Venmo</option>
                    <option value="giggster">Giggster</option>
                  </Select>
                </FormControl>
              </Grid>
              {(formikProps.values.shopkeep === 'paypal' || formikProps.values.shopkeep === 'venmo' || formikProps.values.shopkeep === 'giggster')
                                        && (
                                        <Grid item lg={6} xs={12}>
                                          <TextField
                                            className={classes.width100}
                                            name="transactionId"
                                            label="Transaction ID"
                                            InputLabelProps={{ shrink: true }}
                                            value={formikProps.values.transactionId}
                                            onChange={formikProps.handleChange}
                                            onBlur={formikProps.handleBlur}
                                            error={formikProps.touched.transactionId && Boolean(formikProps.errors.transactionId)}
                                            helperText={formikProps.touched.transactionId && formikProps.errors.transactionId}
                                            autoComplete="off"
                                          />
                                        </Grid>
                                        )}
            </>
            )}
            <Grid item xs={6}>
              <BlueButton variant="contained" type="submit" fullWidth>
                Submit
              </BlueButton>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default AddTransaction;
