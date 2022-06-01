import React from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/lib/styles.scss';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import valid from 'card-validator';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AuthorizeErrors from './authorizeErrors';
import { addAuthorizeTransaction, fetchTransactions, deleteClientCard } from '../../../../../actions/transactions';
import { clearCart } from '../../../../../actions/app';
import {
  getBookingId, getClientId, getTransactions, getCart, getThirdPartyClientIds,
} from '../../../../../selectors';
import { BlueButton } from '../../../../buttons';
import useStyles from '../../../../styles';

const ProcessCard = ({ toggleShopModal, setShowPayment }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const clientId = useSelector((store: any) => getClientId(store));
  const bookingId = useSelector((store: any) => getBookingId(store));
  const transactions = useSelector((store: any) => getTransactions(store));
  const cart = useSelector((store: any) => getCart(store));
  const thirdPartyClients = useSelector(() => getThirdPartyClientIds());

  const { card } = transactions;
  const hasCard = card !== null;

  const [showSavedCard, setShowSavedCard] = React.useState(hasCard);

  const thirdPartyClient = thirdPartyClients.hasOwnProperty(clientId);

  /* FORMIK */
  const validationWithCard = Yup.object().shape({
    cardNumber: Yup.string()
      .test('test-number', 'Credit Card number is invalid', (value) => valid.number(value).isValid)
      .required(),
    cardHolder: Yup.string().required('Minimum length is 3'),
    zipCode: Yup.string().required('Please enter valid zip code').min(5).max(5),
    month: Yup.string().required('This field is required.'),
    year: Yup.string().required('This field is required.'),
    cvc: Yup.string().matches(/^[0-9]{3,4}$/, 'CVV must be 3 or 4 digits length').required('CVV must be 3 or 4 digits length').min(3)
      .max(4),
  });

  const validationWithoutCard = Yup.object().shape({});

  const initialValues = {
    cart: '',
    clientId,
    bookingId,
    cardNumber: '',
    cardHolder: '',
    zipCode: '',
    month: '',
    year: '',
    cvc: '',
    focused: '',
    saveCard: false,
    updateCard: false,
    useCard: hasCard,
  };
  /* FORMIK */

  const deleteCard = () => {
    if (window.confirm('Do you want delete client card?')) {
      Promise.resolve(dispatch(deleteClientCard({ clientId, bookingId }))).then(() => {
        dispatch(fetchTransactions(bookingId));
      }).then(() => {
        setShowSavedCard(false);
        dispatch(clearCart());
        toggleShopModal();
        setShowPayment(false);
      });
    }
  };

  return (
    <>
      <Typography align="center" variant="h4" gutterBottom>
        Process card
      </Typography>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={showSavedCard ? validationWithoutCard : validationWithCard}
        onSubmit={(values: any) => {
          if (cart.items.length !== 0) {
            values.cart = cart;
            // @ts-ignore
            Promise.resolve(dispatch(addAuthorizeTransaction(values)).then(() => {
              dispatch(fetchTransactions(values.bookingId));
            }).then(() => {
              if (values.saveCard) {
                setShowSavedCard(true);
              }
              dispatch(clearCart());
              toggleShopModal();
              setShowPayment(false);
            }));
          } else {
            alert('Please add product in shop');
          }
        }}
      >
        {(formikProps) => (
          <form onSubmit={formikProps.handleSubmit} className={classes.mb10}>
            {showSavedCard && hasCard && (
            <Grid container spacing={1} justify="space-between" alignItems="flex-start">
              <h4 className={`${classes.width100} ${classes.pd3} ${classes.mar0}`}>Card on File</h4>
              <Grid item xs={8}>
                <TextField
                  className={classes.width100}
                  label="Holder"
                  value={card.holder}
                  disabled
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  className={classes.width100}
                  label="Last digits"
                  value={card.number}
                  disabled
                />
              </Grid>
              <Grid item xs={6} xl={3} className={classes.mt10}>
                <FormControlLabel
                  control={(
                    <Switch
                      name="useCard"
                      size="small"
                      checked={showSavedCard}
                      onChange={() => {
                        formikProps.setFieldValue('useCard', !showSavedCard);
                        setShowSavedCard(!showSavedCard);
                      }}
                    />
)}
                  label="Use Card"
                />
              </Grid>
            </Grid>
            )}

            {!showSavedCard
                        && (
                        <Grid container spacing={1} justify="space-between" alignItems="flex-start">
                          <Grid item xs={12}>
                            <Cards
                              cvc={formikProps.values.cvc}
                              expiry={`${formikProps.values.month}${formikProps.values.year}`}
                              name={formikProps.values.cardHolder}
                              number={formikProps.values.cardNumber}
                              focused={formikProps.values.focused}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              className={classes.width100}
                              name="cardNumber"
                              placeholder="Card number"
                              type="number"
                              InputLabelProps={{ shrink: true }}
                              value={formikProps.values.cardNumber}
                              onChange={formikProps.handleChange}
                              onBlur={formikProps.handleBlur}
                              onFocus={() => formikProps.setFieldValue('focused', 'cardNumber')}
                              error={formikProps.touched.cardNumber && Boolean(formikProps.errors.cardNumber)}
                              helperText={formikProps.touched.cardNumber && formikProps.errors.cardNumber}
                            />
                          </Grid>
                          <Grid item xs={8}>
                            <TextField
                              className={classes.width100}
                              name="cardHolder"
                              placeholder="Card Holders Name"
                              InputLabelProps={{ shrink: true }}
                              value={formikProps.values.cardHolder}
                              onChange={formikProps.handleChange}
                              onBlur={formikProps.handleBlur}
                              onFocus={() => formikProps.setFieldValue('focused', 'cardHolder')}
                              error={formikProps.touched.cardHolder && Boolean(formikProps.errors.cardHolder)}
                              helperText={formikProps.touched.cardHolder && formikProps.errors.cardHolder}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <TextField
                              className={classes.width100}
                              name="zipCode"
                              placeholder="Billing Zip"
                              InputLabelProps={{ shrink: true }}
                              value={formikProps.values.zipCode}
                              onChange={formikProps.handleChange}
                              onBlur={formikProps.handleBlur}
                              onFocus={() => formikProps.setFieldValue('focused', 'zipCode')}
                              error={formikProps.touched.zipCode && Boolean(formikProps.errors.zipCode)}
                              helperText={formikProps.touched.zipCode && formikProps.errors.zipCode}
                            />
                          </Grid>
                          <Grid item xs={6} xl={3} className={classes.mt10}>
                            <FormControl variant="outlined" className={classes.width100}>
                              <InputLabel htmlFor="month">Month</InputLabel>
                              <Select
                                name="month"
                                label="Month"
                                native
                                value={formikProps.values.month}
                                onChange={formikProps.handleChange}
                                onBlur={formikProps.handleBlur}
                                onFocus={() => formikProps.setFieldValue('focused', 'month')}
                                error={formikProps.touched.month && Boolean(formikProps.errors.month)}
                                inputProps={{
                                  name: 'month',
                                  id: 'month',
                                }}
                              >
                                <option value="01">Jan (01)</option>
                                <option value="02">Feb (02)</option>
                                <option value="03">Mar (03)</option>
                                <option value="04">Apr (04)</option>
                                <option value="05">May (05)</option>
                                <option value="06">June (06)</option>
                                <option value="07">July (07)</option>
                                <option value="08">Aug (08)</option>
                                <option value="09">Sep (09)</option>
                                <option value="10">Oct (10)</option>
                                <option value="11">Nov (11)</option>
                                <option value="12">Dec (12)</option>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={6} xl={3} className={classes.mt10}>
                            <FormControl variant="outlined" className={classes.width100}>
                              <InputLabel htmlFor="year">Year</InputLabel>
                              <Select
                                name="year"
                                label="Year"
                                native
                                value={formikProps.values.year}
                                onChange={formikProps.handleChange}
                                onBlur={formikProps.handleBlur}
                                onFocus={() => formikProps.setFieldValue('focused', 'year')}
                                error={formikProps.touched.year && Boolean(formikProps.errors.year)}
                                inputProps={{
                                  name: 'year',
                                  id: 'year',
                                }}
                              >
                                <option value="   ">    </option>
                                {(() => {
                                  const options = [];
                                  const today = new Date();
                                  const y = today.getFullYear() + 9;

                                  for (let i = today.getFullYear(); i <= y; i++) {
                                    options.push(<option value={i}>{i}</option>);
                                  }

                                  return options;
                                })()}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={6} xl={3} className={classes.mt10}>
                            <TextField
                              className={classes.width100}
                              name="cvc"
                              placeholder="CVV"
                              InputLabelProps={{ shrink: true }}
                              value={formikProps.values.cvc}
                              onChange={formikProps.handleChange}
                              onBlur={formikProps.handleBlur}
                              onFocus={() => formikProps.setFieldValue('focused', 'cvc')}
                              error={formikProps.touched.cvc && Boolean(formikProps.errors.cvc)}
                              helperText={formikProps.touched.cvc && formikProps.errors.cvc}
                            />
                          </Grid>
                          <Grid item xs={6} xl={3} className={classes.mt10}>
                            {!showSavedCard && hasCard && (
                            <FormControlLabel
                              control={(
                                <Switch
                                  name="updateCard"
                                  size="small"
                                  checked={formikProps.values.updateCard}
                                  onChange={formikProps.handleChange}
                                />
)}
                              label="Save Card"
                            />
                            )}
                            {!showSavedCard && !hasCard && !thirdPartyClient && (
                            <FormControlLabel
                              control={(
                                <Switch
                                  name="saveCard"
                                  size="small"
                                  checked={formikProps.values.saveCard}
                                  onChange={formikProps.handleChange}
                                />
)}
                              label="Save Card"
                            />
                            )}

                            {hasCard && (
                            <FormControlLabel
                              control={(
                                <Switch
                                  name="useCard"
                                  size="small"
                                  checked={showSavedCard}
                                  onChange={() => {
                                    formikProps.setFieldValue('useCard', !showSavedCard);
                                    setShowSavedCard(!showSavedCard);
                                  }}
                                />
)}
                              label="Use Card"
                            />
                            )}
                          </Grid>
                        </Grid>
                        )}

            <br />

            <BlueButton variant="contained" type="submit" fullWidth>
              Pay cart
            </BlueButton>
          </form>
        )}
      </Formik>

      {hasCard
      && (
      <Button variant="contained" color="secondary" fullWidth className={classes.mb10} onClick={deleteCard}>
        Delete card
      </Button>
      )}

      <AuthorizeErrors errors={transactions.auth_txn_errors} />
    </>
  );
};

export default ProcessCard;
