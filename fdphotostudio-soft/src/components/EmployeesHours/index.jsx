import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withStyles, createStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Locations from '../Locations';
import { fetchEmployeesHours } from '../../store/actions/employeesHours';
import { getCurrentLocation, getEmployeesHours, isUserFetched } from '../../store/selectors';
import { fetchCurrentUser } from '../../store/actions/user';
import useStyles from '../styles';
import { formatClockHours } from '../../utils';

const EmployeesHours = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const defaultFromDate = new Date(new Date().setDate(new Date().getDate() - 21));
  const [dateFrom, setDateFrom] = useState(defaultFromDate);
  const [dateTo, setDateTo] = useState(new Date());

  const currentLocationId = useSelector((state) => getCurrentLocation(state));
  const userFetched = useSelector((state) => isUserFetched(state));
  const data = useSelector((state) => getEmployeesHours(state));
  const DATE_FORMAT = 'YYYY-MM-DD';

  const runFilter = () => dispatch(fetchEmployeesHours(currentLocationId, moment(dateFrom).format(DATE_FORMAT), moment(dateTo).format(DATE_FORMAT)));

  const StyledTableRow = withStyles(() => createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: '#F5F5F5',
      },
    },
  }))(TableRow);

  useEffect(() => {
    if (currentLocationId) {
      dispatch(fetchEmployeesHours(currentLocationId, moment(dateFrom).format(DATE_FORMAT), moment(dateTo).format(DATE_FORMAT)));
    }
  }, [currentLocationId]);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);

  return (
    <div>
      {userFetched && <Locations />}
      <br />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          format="yyyy-MM-dd"
          label="Date from"
          value={dateFrom}
          onChange={(date) => setDateFrom(date)}
        />
        <KeyboardDatePicker
          format="yyyy-MM-dd"
          label="Date to"
          value={dateTo}
          disableFuture
          onChange={(date) => setDateTo(date)}
          className={classes.ml15}
        />
        <Button variant="contained" color="secondary" onClick={runFilter} className={`${classes.ml15} ${classes.mt10}`}>
          Search
        </Button>
      </MuiPickersUtilsProvider>

      <TableContainer component={Paper} className={classes.mt20}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell align="right">
                Day Rating
                <Tooltip title="Amount of hours booked / hours worked">
                  <HelpOutlineIcon fontSize="small" />
                </Tooltip>
              </TableCell>
              <TableCell align="right">
                Bookings begin
                <Tooltip title="Time first booking of the day begins">
                  <HelpOutlineIcon fontSize="small" />
                </Tooltip>
              </TableCell>
              <TableCell align="right">
                Bookings end
                <Tooltip title="Time Last booking of the day ends">
                  <HelpOutlineIcon fontSize="small" />
                </Tooltip>
              </TableCell>
              <TableCell align="right">
                Work day hours
                <Tooltip title="Length of the day from first booking to last">
                  <HelpOutlineIcon fontSize="small" />
                </Tooltip>
              </TableCell>
              <TableCell align="right">
                Booking hours
                <Tooltip title="Total number of hours for all bookings in that day">
                  <HelpOutlineIcon fontSize="small" />
                </Tooltip>
              </TableCell>
              <TableCell align="right">
                Clocked in
                <Tooltip title="Time first employee clocked in">
                  <HelpOutlineIcon fontSize="small" />
                </Tooltip>
              </TableCell>
              <TableCell align="right">
                Clocked out
                <Tooltip title="Time last employee clocked out">
                  <HelpOutlineIcon fontSize="small" />
                </Tooltip>
              </TableCell>
              <TableCell align="right">
                Employee hours
                <Tooltip title="Total number of hours employees worked that day">
                  <HelpOutlineIcon fontSize="small" />
                </Tooltip>
              </TableCell>
              <TableCell align="right">
                Early clock in
                <Tooltip title="How many minutes before first booking first employee clocked in">
                  <HelpOutlineIcon fontSize="small" />
                </Tooltip>
              </TableCell>
              <TableCell align="right">
                Late clock out
                <Tooltip title="How many minutes after the last booking last employee clocked out">
                  <HelpOutlineIcon fontSize="small" />
                </Tooltip>
              </TableCell>
              <TableCell>Comments</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(data).map((date) => (
              <StyledTableRow key={date}>
                <TableCell component="th" scope="row">
                  <strong>{date}</strong>
                </TableCell>
                <TableCell align="right" className={classes.border1Solid}>{data[date].dayRating}</TableCell>
                <TableCell align="right">{data[date].bookingBegin}</TableCell>
                <TableCell align="right">{data[date].bookingEnd}</TableCell>
                <TableCell align="right">{data[date].workDayHours}</TableCell>
                <TableCell align="right">{data[date].totalBookingHours}</TableCell>
                <TableCell align="right">{data[date].clockedIn}</TableCell>
                <TableCell align="right" className={data[date].isAutoClockOut && classes.bgRed}>
                  {data[date].clockedOut}
                </TableCell>
                <TableCell align="right">{data[date].totalEmployeeHours}</TableCell>
                <TableCell align="right" className={Math.abs(data[date].earlyClockedIn) > 1800 && classes.bgRed}>
                  {formatClockHours(data[date].earlyClockedIn)}
                </TableCell>
                <TableCell align="right" className={Math.abs(data[date].lateClockedOut) > 1800 && classes.bgRed}>
                  {formatClockHours(data[date].lateClockedOut)}
                </TableCell>
                <TableCell>
                  <ul>
                    {data[date].comments.map((item) => (
                      <li>
                        {`${item.comment} (by ${item.name})`}
                      </li>
                    ))}
                  </ul>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EmployeesHours;
