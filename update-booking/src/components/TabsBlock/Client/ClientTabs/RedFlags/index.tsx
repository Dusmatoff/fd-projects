import React from 'react';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import useStyles from '../../../../styles';

const RedFlags = (props) => {
  const classes = useStyles();

  const { data, client } = props;

  const {
    blacklist,
    blacklistReason,
    negativeBalance,
    negativeSum,
    negativeReason,
    negativeDate,
    deposit100,
    negativeBy,
  } = data.values;

  const owesSum = negativeSum;
  const [blacklistChecked, setBlacklistChecked] = React.useState(blacklist);
  const [owesChecked, setOwesChecked] = React.useState(negativeBalance);

  const handleChangeBlacklist = () => {
    data.setFieldValue('blacklist', !blacklistChecked);
    setBlacklistChecked(!blacklistChecked);
  };

  const handleChangeOwes = () => {
    data.setFieldValue('negativeBalance', !owesChecked);
    setOwesChecked(!owesChecked);
  };

  return (
    <>
      <FormControlLabel
        control={(
          <Checkbox
            color="primary"
            checked={blacklistChecked}
            onChange={handleChangeBlacklist}
            size="small"
          />
)}
        label="Do not book list"
        className={`${classes.mt10} whiteCheckbox`}
      />
      <Collapse in={blacklistChecked}>
        <TextField
          name="blacklistReason"
          label="Do not book list reason"
          InputLabelProps={{ shrink: true }}
          multiline
          rows={2}
          variant="outlined"
          value={blacklistReason}
          onChange={data.handleChange}
          className={`${classes.width100} ${classes.mt10} ${classes.mb10}`}
        />
        {client.blacklist_date && client.blacklist_reason
                && (
                <span className={`${classes.textRight} ${classes.dInherit}`}>
                  added on
                  {' '}
                  {moment(client.blacklist_date).format('M/DD/YY')}
                  {' '}
                  by
                  {' '}
                  {client.blacklist_reason.user}
                </span>
                )}
      </Collapse>

      <FormControlLabel
        control={(
          <Checkbox
            color="primary"
            checked={owesChecked}
            onChange={handleChangeOwes}
            size="small"
          />
)}
        label="Owes to studio"
        className={`${classes.mt10} whiteCheckbox`}
      />
      <Collapse in={owesChecked}>
        <Grid container spacing={1} alignItems="flex-start" className={classes.mt10} >
          <Grid item xs={4}>
            <TextField
              className={classes.numberField}
              name="negativeSum"
              label="Owes Sum"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              type="number"
              value={owesSum}
              onChange={data.handleChange}
              error={data.touched.negativeSum && Boolean(data.errors.negativeSum)}
              helperText={data.touched.negativeSum && data.errors.negativeSum}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              className={classes.numberField}
              name="negativeReason"
              label="Owes Reason"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              value={negativeReason}
              onChange={data.handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                name="negativeDate"
                label="Owes Date"
                format="yyyy-MM-dd"
                value={negativeDate || ''}
                disableFuture
                onChange={(newDate) => data.setFieldValue('negativeDate', newDate)}
                onBlur={data.handleBlur}
                error={data.touched.negativeDate && Boolean(data.errors.negativeDate)}
                helperText={data.touched.negativeDate && data.errors.negativeDate}
                animateYearScrolling
                inputVariant="outlined"
                className={`${classes.dateInput} ${classes.numberField}`}
              />
            </MuiPickersUtilsProvider>
            {negativeBy !== '' && (
            <p>
              by
              {negativeBy}
            </p>
            )}
          </Grid>
        </Grid>
      </Collapse>

      <FormControlLabel
        control={(
          <Checkbox
            name="deposit100"
            color="primary"
            checked={deposit100}
            onChange={data.handleChange}
            size="small"
          />
)}
        label="100% Deposit"
        className={`${classes.mt10} whiteCheckbox`}
      />
    </>
  );
};

export default RedFlags;
