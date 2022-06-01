import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getManagerAnalytics } from '../../../store/selectors';
import { roundToDec, calcRentWorkedHours } from '../../../utils';

const BookingHoursDoneTable = () => {
  const data = useSelector((state) => getManagerAnalytics(state));

  const {
    monthYearsLocManager,
    locations,
    sumHoursEachLocationsDone: sumHours,
    ordinaryHoursByLocations: ordinaryHours,
    overtimeHoursByLocations: overtimeHours,
  } = data;

  const colspan = monthYearsLocManager.length * 2;

  return (
    <TableContainer component={Paper}>
      <Table size="small" padding="default">
        <TableHead>
          <TableRow>
            <TableCell>Category/Stage</TableCell>
            {monthYearsLocManager.map((year) => <TableCell>{year}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* BOOKING DONE HOURS */}
          <TableRow>
            <TableCell colSpan={colspan}>
              <strong>BOOKING DONE HOURS</strong>
            </TableCell>
          </TableRow>
          {Object.keys(locations).map((locationId) => (
            <TableRow>
              <TableCell component="th" scope="row">
                {locations[locationId]}
              </TableCell>
              {monthYearsLocManager.map((year) => (
                <TableCell>
                  {sumHours?.[year]?.[locationId] && `${roundToDec(sumHours[year][locationId] * 60)}h`}
                </TableCell>
              ))}
            </TableRow>
          ))}
          <TableRow>
            <TableCell />
            <TableCell colSpan={colspan} />
          </TableRow>
          {/* BOOKING DONE HOURS */}

          {/* ORDINARY HOURS */}
          <TableRow>
            <TableCell colSpan={colspan}>
              <strong>ORDINARY HOURS</strong>
            </TableCell>
          </TableRow>
          {Object.keys(locations).map((locationId) => (
            <TableRow>
              <TableCell component="th" scope="row">
                {locations[locationId]}
              </TableCell>
              {monthYearsLocManager.map((year) => (
                <TableCell>
                  {ordinaryHours?.[year]?.[locationId] ? `${roundToDec(ordinaryHours[year][locationId])}h` : '0h'}
                </TableCell>
              ))}
            </TableRow>
          ))}
          <TableRow>
            <TableCell />
            <TableCell colSpan={colspan} />
          </TableRow>
          {/* ORDINARY HOURS */}

          {/* OVERTIME HOURS */}
          <TableRow>
            <TableCell colSpan={colspan}>
              <strong>OVERTIME HOURS</strong>
            </TableCell>
          </TableRow>
          {Object.keys(locations).map((locationId) => (
            <TableRow>
              <TableCell component="th" scope="row">
                {locations[locationId]}
              </TableCell>
              {monthYearsLocManager.map((year) => (
                <TableCell>
                  {overtimeHours?.[year]?.[locationId] ? `${roundToDec(overtimeHours[year][locationId])}h` : '0h'}
                </TableCell>
              ))}
            </TableRow>
          ))}
          <TableRow>
            <TableCell />
            <TableCell colSpan={colspan} />
          </TableRow>
          {/* OVERTIME HOURS */}

          {/* RENTED/WORKED HOURS */}
          <TableRow>
            <TableCell colSpan={colspan}>
              <strong>RENTED/WORKED HOURS</strong>
            </TableCell>
          </TableRow>
          {Object.keys(locations).map((locationId) => (
            <TableRow>
              <TableCell component="th" scope="row">
                {locations[locationId]}
              </TableCell>
              {monthYearsLocManager.map((year, index) => {
                const current = calcRentWorkedHours(sumHours, ordinaryHours, overtimeHours, year, locationId);

                let previous = null;

                const m = index - 1;

                const previousMonthYear = m in monthYearsLocManager ? monthYearsLocManager[m] : moment().subtract(7, 'month').format('MM-YYYY');

                previous = calcRentWorkedHours(sumHours, ordinaryHours, overtimeHours, previousMonthYear, locationId);

                let className = '';

                if (previous !== null) {
                  if (current === previous) {
                    className = 'yellowCell';
                  }

                  if (current > previous) {
                    className = 'greenCell';
                  }

                  if (current < previous) {
                    className = 'redCell';
                  }
                }

                return (
                  <TableCell className={className}>
                    {current}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
          {/* RENTED/WORKED HOURS */}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookingHoursDoneTable;
