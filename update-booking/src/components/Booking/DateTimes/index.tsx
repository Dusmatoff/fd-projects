import React from 'react';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import { TimePicker } from 'react-pickers-bs4';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import StudiosSelect from '../../StudiosSelect';
import { getFormatMethod, roundTime, MOMENT_FORMAT_TIME } from '../../../utils';
import useStyles from '../../styles';

const DateTimes = ({ data }) => {
  const classes = useStyles();

  const {
    date,
    dayOfWeek,
    startTime,
    endTime,
    totalHours,
    from,
    fromLink,
    rentType,
  } = data.values;

  return (
    <>
      <Grid container spacing={1} justify="space-around">
        <Grid item xs={4}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              name="date"
              label="Date"
              format="MM/dd/yy"
              value={date}
              disablePast
              onChange={(dateValue) => data.setFieldValue('date', dateValue)}
              onBlur={data.handleBlur}
              error={data.touched.date && Boolean(data.errors.date)}
              helperText={data.touched.date && data.errors.date}
              animateYearScrolling
              inputVariant="outlined"
              className={classes.dateInput}
            />
          </MuiPickersUtilsProvider>
          <Typography align="center" display="block" variant="caption">{dayOfWeek}</Typography>
        </Grid>
        <Grid item xs={4}>
          <TimePicker
            name="startTime"
            pickerFormat="12"
            displayFormat={MOMENT_FORMAT_TIME}
            returnFormat={MOMENT_FORMAT_TIME}
            value={startTime}
            onChange={({ value }) => {
              const method = getFormatMethod(startTime, value);
              const formattedRound = roundTime(moment(value, MOMENT_FORMAT_TIME), moment.duration(5, 'minutes'), method);
              data.setFieldValue('startTime', formattedRound.format(MOMENT_FORMAT_TIME));
            }}
            placeholder="Start"
            error={data.touched.startTime && Boolean(data.errors.startTime)}
            inputSize="lg"
          />
        </Grid>
        <Grid item xs={4}>
          <TimePicker
            name="endTime"
            pickerFormat="12"
            displayFormat="hh:mm A"
            returnFormat="hh:mm A"
            value={endTime}
            onChange={({ value }) => {
              const method = getFormatMethod(endTime, value);
              const formattedRound = roundTime(moment(value, MOMENT_FORMAT_TIME), moment.duration(5, 'minutes'), method);
              data.setFieldValue('endTime', formattedRound.format(MOMENT_FORMAT_TIME));
            }}
            placeholder="End"
            error={data.touched.startTime && Boolean(data.errors.startTime)}
            inputSize="lg"
          />
          <Typography align="center" display="block" variant="caption">
            {totalHours}
            {' '}
            hours
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1} justify="space-between" alignItems="center" className={classes.flexNoWrap}>
        <Grid item xs={6} xl={4}>
          <StudiosSelect data={data} showLinkIcon />
        </Grid>

        <Grid item xs={6} lg={4}>
          <FormControl variant="outlined" className={`${classes.width100} ${classes.width200}`}>
            <InputLabel htmlFor="from">From</InputLabel>
            <Select
              name="from"
              native
              value={from}
              onChange={data.handleChange}
              label="From"
              inputProps={{
                name: 'from',
                id: 'from',
              }}
            >
              <option value="client">Client</option>
              <option value="FD">FD</option>
              <option value="other">Other</option>
              <option value="peerspace">Peerspace</option>
              <option value="storefront">Storefront</option>
              <option value="splacer">Splacer</option>
              <option value="giggster">Giggster</option>
            </Select>
          </FormControl>
        </Grid>
        {from !== 'client' && from !== 'FD'
        && (
        <Grid item xs={6} lg={4}>
          <TextField
            name="fromLink"
            label="Link"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={fromLink}
            onChange={data.handleChange}
            onBlur={data.handleBlur}
            error={data.touched.fromLink && Boolean(data.errors.fromLink)}
            helperText={data.touched.fromLink && data.errors.fromLink}
            className={`${classes.width100} ${classes.numberField}`}
          />
        </Grid>
        )}

        <Grid item xs={6} lg={4}>
          <FormControl variant="outlined" className={`${classes.width100} ${classes.width200}`}>
            <InputLabel htmlFor="rentType">Type</InputLabel>
            <Select
              name="rentType"
              native
              value={rentType}
              onChange={data.handleChange}
              label="Type"
              inputProps={{
                name: 'rentType',
                id: 'rentType',
              }}
            >
              <option value="default">Didn`t ask</option>
              <option value="photoshoot">Photoshoot</option>
              <option value="event">Event</option>
              <option value="video">Video</option>
              <option value="photo+video">Photo + Video</option>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

export default DateTimes;
