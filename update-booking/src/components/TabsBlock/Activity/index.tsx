import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { getBookingLogs, getClient } from '../../../selectors';
import { addLog, fetchBookingLogs } from '../../../actions/bookingLogs';
import { GreenButton } from '../../buttons';
import useStyles from '../../styles';

const Activity = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const logs = useSelector((state) => getBookingLogs(state));
  const client = useSelector((state) => getClient(state));

  let logsList;

  if (logs) {
    logsList = Object.keys(logs).map((item) => (
      <Card className={`${classes.margin} ${logs[item].status} `}>
        <CardContent className={classes.cardPadding}>
          <Typography variant="body1" component="p">
            {logs[item].sentence}
          </Typography>
          <Typography variant="body2" component="p" color="textSecondary">
            by
            {' '}
            <b>{logs[item].by_name}</b>
            {' '}
            <small>{logs[item].date}</small>
          </Typography>
        </CardContent>
      </Card>
    ));
  }

  const validationSchema = Yup.object({
    logAction: Yup.string().required('Choose action'),
  });

  /* FORMIK */
  const initialValues = {
    id: client.id,
    appId: client.app_id,
    logNote: '',
    logAction: '',
  };
  /* FORMIK */

  return (
    <Grid container justify="space-around">
      <Grid item xs={8}>
        {logsList}
      </Grid>
      <Grid item xs={4}>
        <h3>Add Action:</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={(values) => {
            Promise.resolve(dispatch(addLog(values))).then(() => {
              dispatch(fetchBookingLogs(values.appId));
            });
          }}
        >
          {(formikProps) => (
            <form onSubmit={formikProps.handleSubmit}>
              <FormControl variant="outlined" className={`${classes.mb15} ${classes.width100}`}>
                <InputLabel htmlFor="logAction">Name</InputLabel>
                <Select
                  name="logAction"
                  native
                  onChange={formikProps.handleChange}
                  label="Name"
                  inputProps={{
                    name: 'logAction',
                    id: 'logAction',
                  }}
                  error={formikProps.touched.logAction && Boolean(formikProps.errors.logAction)}
                >
                  <option>---</option>
                  <option value="Called">Called</option>
                  <option value="Emailed">Emailed</option>
                  <option value="Texted">Texted</option>
                  <option value="Talked">Talked</option>
                </Select>
              </FormControl>
              <TextField
                name="logNote"
                onChange={formikProps.handleChange}
                label="Notes, can be empty"
                InputLabelProps={{ shrink: true }}
                multiline
                rows={1}
                value={formikProps.values.logNote}
                variant="outlined"
                className={`${classes.mb10} ${classes.width100}`}
              />
              <br />
              <GreenButton variant="contained" type="submit" fullWidth>
                Add
              </GreenButton>
            </form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default Activity;
