import React from 'react';
import moment from 'moment';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import useStyles from '../../../../styles';

const UpcomingBookings = (props) => {
  const classes = useStyles();

  const { client } = props;

  const { upcoming_bookings: upcomingBookings } = client;

  if (upcomingBookings.length === 0) {
    return (
      <p>Not found upcoming bookings...</p>
    );
  }

  return (
    <TableContainer className={classes.upcomingBookingTable}>
      <Table size="small" aria-label="Upcoming Bookings" className={classes.mt10}>
        <TableBody>
          {Object.keys(upcomingBookings).map((item) => (
            <TableRow key={upcomingBookings[item].id}>
              <TableCell className={`${classes.blueTd} ${classes.pd0}`}>
                {upcomingBookings[item].name}
              </TableCell>
              <TableCell className={`${upcomingBookings[item].status} ${classes.statusBckg} ${classes.textUnderline} ${classes.pd0}`}>
                <a
                  href={`/wp-admin/admin.php?page=update-booking&updateid=${upcomingBookings[item].id}`}
                  target="_blank"
                  className={`${classes.textLowercase} ${classes.textBlack} ${classes.noWordSpace}`}
                  rel="noreferrer"
                >
                  {upcomingBookings[item].start_time}
                  {' '}
                  -
                  {upcomingBookings[item].end_time}
                </a>
              </TableCell>
              <TableCell className={`${classes.dateBooking} ${classes.pd0}`}>
                { moment(upcomingBookings[item].date).format('MM.DD.YY') }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UpcomingBookings;
