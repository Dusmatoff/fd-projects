import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputMask from 'react-input-mask';
import { addClient } from '../../store/actions/clients';
import useStyles from '../styles';

const AddClient = ({ show, handleClose, updateTable }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  Yup.addMethod(Yup.string, 'phoneValidation', function (phone) {
    return this.test('test-phone', phone, (value) => {
      if (value) {
        const phoneFormatted = value.match(/\d/g).join('');

        return phoneFormatted.length === 10;
      }

      return true;
    });
  });

  const validationSchema = Yup.object({
    name: Yup.string().trim().matches(/[a-z A-Z]/i, 'Please provide valid name').min(3, 'Minimum length is 3')
      .max(100, 'Maximum 100 symbols')
      .required('Name is required'),
    phone: Yup.string().phoneValidation('Please provide valid phone').required(),
    phone2: Yup.string().phoneValidation('Please provide valid phone 2').nullable(),
    phone3: Yup.string().phoneValidation('Please provide valid phone 3').nullable(),
    email: Yup.string().matches(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm, 'Please provide valid email').max(320, 'Maximum 320 symbols').required('Email is required'),
    email2: Yup.string().matches(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm, 'Please provide valid email').max(320, 'Maximum 320 symbols'),
    email3: Yup.string().matches(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm, 'Please provide valid email').max(320, 'Maximum 320 symbols'),
    comments: Yup.string().max(1000, 'Maximum 1000 symbols'),
  });

  const initialValues = {
    name: '',
    birthday: null,
    phone: '',
    email: '',
    phone2: '',
    email2: '',
    phone3: '',
    email3: '',
    comments: '',
  };

  return (
    <Dialog maxWidth="md" open={show} onClose={handleClose}>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values) => {
          if (values.birthday) {
            values.birthday = moment(values.birthday).format('YYYY-MM-DD');
          }

          Promise.resolve(dispatch(addClient(values))).then(() => {
            updateTable();
            handleClose();
          });
        }}
      >
        {(formikProps) => (
          <form onSubmit={formikProps.handleSubmit}>
            <DialogTitle>Add client</DialogTitle>
            <DialogContent>
              <Grid container spacing={1} justify="space-between">
                <Grid item xs={6}>
                  <TextField
                    name="name"
                    label="Name"
                    variant="outlined"
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    error={formikProps.touched.name && Boolean(formikProps.errors.name)}
                    helperText={formikProps.touched.name && formikProps.errors.name}
                    className={`${classes.width100} ${classes.textField}`}
                    value={formikProps.values.name}
                  />
                </Grid>
                <Grid item xs={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      name="birthday"
                      label="Birthday"
                      emptyLabel="Choose date"
                      inputVariant="outlined"
                      format="yyyy-MM-dd"
                      value={formikProps.values.birthday}
                      onChange={(dateValue) => formikProps.setFieldValue('birthday', dateValue)}
                      className={`${classes.width100} ${classes.textField}`}
                      disableFuture
                      animateYearScrolling
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={6}>
                  Phone
                  <br />
                  <div className={classes.inputBoxPhone}>
                    <span>+1</span>
                    <InputMask
                      name="phone"
                      mask="(999) 999-9999"
                      onChange={formikProps.handleChange}
                      value={formikProps.values.phone}
                      className={classes.phoneInput}
                    />
                  </div>
                  <p className={classes.red}>{formikProps.errors.phone}</p>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="email"
                    label="Email"
                    variant="outlined"
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    error={formikProps.touched.email && Boolean(formikProps.errors.email)}
                    helperText={formikProps.touched.email && formikProps.errors.email}
                    className={`${classes.width100} ${classes.textField}`}
                    value={formikProps.values.email}
                  />
                </Grid>
                <Grid item xs={6}>
                  Phone 2
                  <br />
                  <div className={classes.inputBoxPhone}>
                    <span>+1</span>
                    <InputMask
                      name="phone2"
                      mask="(999) 999-9999"
                      onChange={formikProps.handleChange}
                      value={formikProps.values.phone2}
                      className={classes.phoneInput}
                    />
                  </div>
                  <p className={classes.red}>{formikProps.errors.phone2}</p>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="email2"
                    label="Email 2"
                    variant="outlined"
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    error={formikProps.touched.email2 && Boolean(formikProps.errors.email2)}
                    helperText={formikProps.touched.email2 && formikProps.errors.email2}
                    className={`${classes.width100} ${classes.textField}`}
                    value={formikProps.values.email2}
                  />
                </Grid>
                <Grid item xs={6}>
                  Phone 3
                  <br />
                  <div className={classes.inputBoxPhone}>
                    <span>+1</span>
                    <InputMask
                      name="phone3"
                      mask="(999) 999-9999"
                      onChange={formikProps.handleChange}
                      value={formikProps.values.phone3}
                      className={classes.phoneInput}
                    />
                  </div>
                  <p className={classes.red}>{formikProps.errors.phone3}</p>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="email3"
                    label="Email 3"
                    variant="outlined"
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    error={formikProps.touched.email3 && Boolean(formikProps.errors.email3)}
                    helperText={formikProps.touched.email3 && formikProps.errors.email3}
                    className={`${classes.width100} ${classes.textField}`}
                    value={formikProps.values.email3}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="comments"
                    label="Comments"
                    InputLabelProps={{ shrink: true }}
                    multiline
                    rows={2}
                    variant="outlined"
                    value={formikProps.values.comments}
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    error={formikProps.touched.comments && Boolean(formikProps.errors.comments)}
                    helperText={formikProps.touched.comments && formikProps.errors.comments}
                    className={classes.width100}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" color="primary" type="submit">
                Add
              </Button>
              <Button variant="contained" onClick={handleClose}>
                Close
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};

export default AddClient;
