import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import StudiosSelect from '../../../../StudiosSelect';
import { getBooking, getPrepareClientHours } from '../../../../../selectors';
import { prepareClientHours } from '../../../../../actions/app';
import { addClientHours, fetchPackages } from '../../../../../actions/packages';
import { fetchTransactions } from '../../../../../actions/transactions';
import { GreenButton, BlueButton } from '../../../../buttons';
import useStyles from '../../../../styles';

const AddPackage = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const booking = useSelector((state) => getBooking(state));
  const clientHours = useSelector((state) => getPrepareClientHours(state));

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  /* FORMIK */
  const validationSchema = Yup.object().shape({
    hoursDate: Yup.date().required(),
    isWeekend: Yup.string().required(),
    hallId: Yup.string().required(),
    packageCount: Yup.number().integer('Min 1, max 99').min(1).max(99)
      .required(),
    packageId: Yup.string().required(),
  });

  const initialValues = {
    bookingId: booking.id,
    hallId: booking.hall_id,
    packageId: '1',
    packageCount: 1,
    hoursDate: new Date(),
    isWeekend: '0',
    clientId: booking.client_id,
    submitButtonType: '',
    packageTxnId: '0',
  };
  /* FORMIK */

  return (
    <div>
      <GreenButton variant="contained" onClick={toggleModal} className={`${classes.centerBtn} ${classes.mt10} ${classes.mb10}`}>
        Add Package
      </GreenButton>
      <Dialog className={classes.dialogWindow} maxWidth="md" open={showModal} onClose={toggleModal}>
        <DialogTitle className={classes.textCenter}>
          <Typography variant="h4">Add Package</Typography>
          <IconButton aria-label="close" className={`${classes.closeButton} positionAbsolute`} onClick={toggleModal}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.pdContent}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              switch (values.submitButtonType) {
                case 'prepare_client_hours':
                default:
                  dispatch(prepareClientHours(values));
                  break;
                case 'add_client_hours':
                  if (values.packageTxnId !== '0') {
                    Promise.resolve(dispatch(addClientHours(values))).then(() => {
                      dispatch(fetchPackages(values.clientId));
                    }).then(() => {
                      dispatch(fetchTransactions(values.bookingId));
                      actions.resetForm();
                      toggleModal();
                    });
                  } else {
                    alert('Please choose rent payment');
                  }
                  break;
              }
            }}
          >
            {(formikProps) => (
              <form className={classes.mb15} onSubmit={formikProps.handleSubmit}>
                <Grid container spacing={1} justify="space-between" alignItems="flex-start">
                  <Grid item xs={4}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker
                        name="hoursDate"
                        label="Date"
                        format="M/dd/yy"
                        value={formikProps.values.hoursDate}
                        onChange={(dateValue) => formikProps.setFieldValue('hoursDate', dateValue)}
                        onBlur={formikProps.handleBlur}
                        error={formikProps.touched.hoursDate && Boolean(formikProps.errors.hoursDate)}
                        helperText={formikProps.touched.hoursDate && formikProps.errors.hoursDate}
                        animateYearScrolling
                        disablePast
                        inputVariant="outlined"
                        className={`${classes.dateInput} ${classes.width100}`}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl variant="outlined" className={classes.width100}>
                      <InputLabel htmlFor="isWeekend">Is weekend</InputLabel>
                      <Select
                        name="isWeekend"
                        native
                        value={formikProps.values.isWeekend}
                        onChange={formikProps.handleChange}
                        label="Is weekend"
                        inputProps={{
                          name: 'isWeekend',
                          id: 'isWeekend',
                        }}
                      >
                        <option value="0">Reg</option>
                        <option value="1">Wknd</option>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <StudiosSelect data={formikProps} removeAny />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      name="packageCount"
                      type="number"
                      label="Qty"
                      variant="outlined"
                      className={`${classes.numberField} ${classes.width100}`}
                      InputLabelProps={{ shrink: true }}
                      value={formikProps.values.packageCount}
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                      error={formikProps.touched.packageCount && Boolean(formikProps.errors.packageCount)}
                      helperText={formikProps.touched.packageCount && formikProps.errors.packageCount}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl variant="outlined" className={classes.width100}>
                      <InputLabel htmlFor="packageId">Package</InputLabel>
                      <Select
                        name="packageId"
                        value={formikProps.values.packageId}
                        native
                        onChange={formikProps.handleChange}
                        label="Package"
                        inputProps={{
                          name: 'packageId',
                          id: 'packageId',
                        }}
                      >
                        <option value="1">Rent by hour</option>
                        <option value="4">4 hour pack</option>
                        <option value="8">8 hour pack</option>
                        <option value="12">12 hour pack</option>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <BlueButton
                      variant="contained"
                      fullWidth
                      onClick={(e) => {
                        formikProps.setFieldValue('submitButtonType', 'prepare_client_hours');
                        // @ts-ignore
                        formikProps.handleSubmit(e);
                      }}
                    >
                      Submit
                    </BlueButton>
                  </Grid>
                </Grid>
                <br />
                {Object.keys(clientHours).length !== 0
                    && (
                    <Grid container spacing={1} justify="space-around" alignItems="flex-end">
                      <Grid item xs={4}>
                        {`${clientHours.count} * $${clientHours.rate} = $${clientHours.amount}`}
                      </Grid>
                      <Grid item xs={4}>
                        <FormControl variant="outlined" className={classes.width100}>
                          <InputLabel htmlFor="packageTxnId">Rent Payment</InputLabel>
                          <Select
                            name="packageTxnId"
                            value={formikProps.values.packageTxnId}
                            native
                            onChange={formikProps.handleChange}
                            label="Rent Payment"
                            inputProps={{
                              name: 'packageTxnId',
                              id: 'packageTxnId',
                            }}
                          >
                            <option value="0">---</option>
                            {clientHours.availableTxn.map((txn) => {
                              if (txn.type === 'multi') {
                                const value = Object.keys(txn.transaction_ids).map((id) => `${id}-${txn.transaction_ids[id]}`);
                                return <option value={value}>{txn.amount}</option>;
                              }

                              return <option value={txn.transaction_id}>{txn.amount}</option>;
                            })}

                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={4}>
                        <GreenButton
                          variant="contained"
                          fullWidth
                          onClick={(e) => {
                            formikProps.setFieldValue('submitButtonType', 'add_client_hours');
                            // @ts-ignore
                            formikProps.handleSubmit(e);
                          }}
                        >
                          Add
                        </GreenButton>
                      </Grid>
                    </Grid>
                    )}
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddPackage;
