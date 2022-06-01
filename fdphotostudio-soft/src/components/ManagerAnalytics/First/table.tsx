import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { getManagerAnalytics } from '../../../store/selectors';
import { roundToDec, calcRentWorkedHours } from '../../../utils';
import useStyles from '../../styles';

const BookingHoursDoneTable = () => {
  const classes = useStyles();

  const data = useSelector((state) => getManagerAnalytics(state));

  const {
    monthYearsManager: months,
    locations,
    sumHoursEachLocationsDone: sumHours,
    ordinaryHoursByLocations: ordinaryHours,
    overtimeHoursByLocations: overtimeHours,
    totalSalaryByLocations: totalSalary,
  } = data;

  const colspan = months.length * 2 + 1;

  const defaultCheckboxes = {};
  for (const id in locations) {
    defaultCheckboxes[id] = true;
  }
  const [checkboxes, setCheckboxes] = useState(defaultCheckboxes);
  const handleChangeCheckbox = (event) => {
    setCheckboxes({ ...checkboxes, [event.target.name]: event.target.checked });
  };

  return (
    <TableContainer component={Paper}>
      <FormControl component="fieldset" className={classes.margin2}>
        <FormLabel component="legend">Locations</FormLabel>
        <FormGroup className={classes.flex} style={{ flexDirection: 'row' }}>
          {Object.keys(locations).map((id) => (
            <FormControlLabel
              control={(
                <Checkbox
                  checked={checkboxes[id]}
                  onChange={handleChangeCheckbox}
                  name={id}
                />
                      )}
              label={locations[id]}
            />
          ))}
        </FormGroup>
      </FormControl>

      <Table size="small" padding="default">
        <TableHead>
          <TableRow>
            <TableCell className={classes.stickyCell}>Category/Stage</TableCell>
            {months.map((year) => (
              <>
                <TableCell className={classes.minWidth55}>{year}</TableCell>
                <TableCell>DIFF</TableCell>
              </>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {/* BOOKING DONE HOURS */}
          <TableRow>
            <TableCell className={classes.stickyCell}>
              <strong>BOOKING DONE HOURS</strong>
            </TableCell>
          </TableRow>
          {Object.keys(checkboxes).filter((id) => checkboxes[id] === true).map((locationId) => (
            <TableRow>
              <TableCell component="th" scope="row" className={classes.stickyCell}>
                {locations[locationId]}
              </TableCell>
              {months.map((item, index) => (
                <>
                  <TableCell>
                    {sumHours?.[item]?.[locationId] && `${roundToDec(sumHours[item][locationId] * 60)}h`}
                  </TableCell>
                  <TableCell className={classes.diff}>
                    {sumHours?.[item]?.[locationId] && sumHours?.[months[index + 1]]?.[locationId] ? roundToDec((sumHours[item][locationId] * 60) - (sumHours[months[index + 1]][locationId] * 60)) : 0}
                  </TableCell>
                </>
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
            <TableCell className={classes.stickyCell}>
              <strong>ORDINARY HOURS</strong>
            </TableCell>
          </TableRow>
          {Object.keys(checkboxes).filter((id) => checkboxes[id] === true).map((locationId) => (
            <TableRow>
              <TableCell component="th" scope="row" className={classes.stickyCell}>
                {locations[locationId]}
              </TableCell>
              {months.map((item, index) => (
                <>
                  <TableCell>
                    {ordinaryHours?.[item]?.[locationId] && `${roundToDec(ordinaryHours[item][locationId])}h`}
                  </TableCell>
                  <TableCell className={classes.diff}>
                    {ordinaryHours?.[item]?.[locationId] && ordinaryHours?.[months[index + 1]]?.[locationId] ? `${roundToDec((ordinaryHours[item][locationId]) - (ordinaryHours[months[index + 1]][locationId]))}h` : '0'}
                  </TableCell>
                </>
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
            <TableCell className={classes.stickyCell}>
              <strong>OVERTIME HOURS</strong>
            </TableCell>
          </TableRow>
          {Object.keys(checkboxes).filter((id) => checkboxes[id] === true).map((locationId) => (
            <TableRow>
              <TableCell component="th" scope="row" className={classes.stickyCell}>
                {locations[locationId]}
              </TableCell>
              {months.map((item, index) => (
                <>
                  <TableCell>
                    {overtimeHours?.[item]?.[locationId] && `${roundToDec(overtimeHours[item][locationId])}h`}
                  </TableCell>
                  <TableCell className={classes.diff}>
                    {overtimeHours?.[item]?.[locationId] && overtimeHours?.[months[index + 1]]?.[locationId] ? `${roundToDec((overtimeHours[item][locationId]) - (overtimeHours[months[index + 1]][locationId]))}h` : '0h'}
                  </TableCell>
                </>
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
            <TableCell className={classes.stickyCell}>
              <strong>RENTED/WORKED HOURS</strong>
            </TableCell>
          </TableRow>
          {Object.keys(checkboxes).filter((id) => checkboxes[id] === true).map((locationId) => (
            <TableRow>
              <TableCell component="th" scope="row" className={classes.stickyCell}>
                {locations[locationId]}
              </TableCell>
              {months.map((year) => (
                <>
                  <TableCell>
                    {calcRentWorkedHours(sumHours, ordinaryHours, overtimeHours, year, locationId)}
                  </TableCell>
                  <TableCell className={classes.diff} />
                </>
              ))}
            </TableRow>
          ))}
          {/* RENTED/WORKED HOURS */}

          {/* TOTAL SALARY */}
          <TableRow>
            <TableCell className={classes.stickyCell}>
              <strong>TOTAL SALARY</strong>
            </TableCell>
          </TableRow>
          {Object.keys(checkboxes).filter((id) => checkboxes[id] === true).map((locationId) => (
            <TableRow>
              <TableCell component="th" scope="row" className={classes.stickyCell}>
                {locations[locationId]}
              </TableCell>
              {months.map((item, index) => (
                <>
                  <TableCell>
                    {totalSalary?.[item]?.[locationId]}
                  </TableCell>
                  <TableCell className={classes.diff}>
                    {totalSalary?.[item]?.[locationId] && totalSalary?.[months[index + 1]]?.[locationId] ? totalSalary[item][locationId] - totalSalary[months[index + 1]][locationId] : '0'}
                  </TableCell>
                </>
              ))}
            </TableRow>
          ))}
          <TableRow>
            <TableCell />
            <TableCell colSpan={colspan} />
          </TableRow>
          {/* TOTAL SALARY */}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookingHoursDoneTable;
