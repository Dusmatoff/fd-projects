import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { fetchDailyReports } from '../../../store/actions/reports';
import {
  getDailyReports, getLocations, isDailyReportsFetched, getItems,
} from '../../../store/selectors';
import useStyles from '../../styles';

const DailyReports = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const isFetched = useSelector((state) => isDailyReportsFetched(state));

  const items = useSelector((state) => getItems(state));
  const data = useSelector((state) => getDailyReports(state));
  const locations = useSelector((state) => getLocations(state));

  const { reports, cityCounts, locationCounts } = data;

  const [date, setDate] = useState(new Date());

  const updateReport = () => {
    dispatch(fetchDailyReports(moment(date).add(1, 'days').format('YYYY-MM-DD')));
  };

  useEffect(() => {
    updateReport();
  }, []);

  if (!isFetched) {
    return null;
  }

  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          format="yyyy-MM-dd"
          label="Date"
          value={date}
          onChange={(value) => setDate(value)}
          InputProps={{
            disableUnderline: true
          }}
        />
      </MuiPickersUtilsProvider>

      <Button variant="contained" color="secondary" onClick={updateReport} className={`${classes.ml15} ${classes.mt10} ${classes.GreenButton}`}>
        Generate
      </Button>

      <Typography variant="h4" align="center" className={classes.mt10}>Los Angeles</Typography>
      <TableContainer component={Paper}>
        <Table padding="none" >
          <TableRow>
            <TableCell component="th" scope="row" className={`${classes.borderRight1} `} style={{ width: 206 }} />
            {
              locations.map(({ cityId, name }) => cityId === 1 && <TableCell className={`${classes.borderRight1} ${classes.pd5}`}>{name === 'LA Lofts' ? 'Distribution(LA Lofts)' : name}</TableCell>)
            }
            <TableCell component="th" scope="row" />
          </TableRow>
          {
              items.map(({ id: itemId, name, meta }) => {
                let itemCount = 0;
                return (
                  <TableRow>
                    <TableCell className={`${classes.borderRight1} ${classes.pd5}`} style={{ backgroundColor: meta?.color }}>
                      {name}
                    </TableCell>
                    {locations.map(({ id: locationId, cityId: locCityId }) => {
                      if (locCityId === 1) {
                        const qty = reports?.[1]?.[locationId]?.[itemId];
                        if (qty) {
                          itemCount += qty;
                        }
                        return (
                          <TableCell className={`${classes.borderRight1} ${classes.pd5}`}>{qty}</TableCell>
                        );
                      }

                      return null;
                    })}
                    <TableCell className={classes.pd5} style={{ width: 210 }}><b>{itemCount > 0 ? itemCount : null}</b></TableCell>
                  </TableRow>
                );
              })
            }
          <TableRow>
            <TableCell className={`${classes.borderRight1} ${classes.pd5}`} />
            {locations.map(({ id: locationId, cityId: locCityId }) => locCityId === 1 && (
            <TableCell className={`${classes.borderRight1} ${classes.pd5}`}>
              <b>{locationCounts?.[1]?.[locationId]}</b>
            </TableCell>
            ))}
            <TableCell className={classes.pd5}><b>{cityCounts?.[1]}</b></TableCell>
          </TableRow>
        </Table>
      </TableContainer>

      <Typography variant="h4" align="center" className={classes.mt10}>New York</Typography>
      <TableContainer component={Paper}>
        <Table  padding="none" >
          <TableRow>
            <TableCell component="th" scope="row" className={`${classes.borderRight1} ${classes.pd5}`} style={{ width: 200}}/>
            {
                locations.map(({ cityId, name }) => cityId === 2 && <TableCell className={`${classes.borderRight1} ${classes.pd5}`}>{name}</TableCell>)
            }
            <TableCell component="th" scope="row" />
          </TableRow>
          {
              items.map(({ id: itemId, name, meta }) => {
                let itemCount = 0;
                return (
                  <TableRow>
                    <TableCell className={`${classes.borderRight1} ${classes.pd5}`} style={{ backgroundColor: meta?.color}}>
                      {name}
                    </TableCell>
                    {locations.map(({ id: locationId, cityId: locCityId }) => {
                      if (locCityId === 2) {
                        const qty = reports?.[2]?.[locationId]?.[itemId];
                        if (qty) {
                          itemCount += qty;
                        }
                        return (
                          <TableCell className={`${classes.borderRight1} ${classes.pd5}`}>{qty}</TableCell>
                        );
                      }

                      return null;
                    })}
                    <TableCell className={classes.pd5} style={{ width: 210 }}><b>{itemCount > 0 ? itemCount : null}</b></TableCell>
                  </TableRow>
                );
              })
          }
          <TableRow>
            <TableCell className={`${classes.borderRight1} ${classes.pd5}`} />
            {locations.map(({ id: locationId, cityId: locCityId }) => locCityId === 2 && (
            <TableCell className={`${classes.borderRight1} ${classes.pd5}`}>
              <b>{locationCounts?.[2]?.[locationId]}</b>
            </TableCell>
            ))}
            <TableCell className={classes.pd5}><b>{cityCounts?.[2]}</b></TableCell>
          </TableRow>
        </Table>
      </TableContainer>

      <Typography variant="h4" align="center" className={classes.mt10}>Chicago</Typography>
      <TableContainer component={Paper}>
        <Table  padding="none" >
          <TableRow>
            <TableCell component="th" scope="row" className={`${classes.borderRight1} ${classes.pd5}`} style={{ width: 200}}/>
            {
                locations.map(({ cityId, name }) => cityId === 3 && <TableCell className={`${classes.borderRight1} ${classes.pd5}`}>{name}</TableCell>)
            }
            <TableCell component="th" scope="row" />
          </TableRow>
          {
              items.map(({ id: itemId, name, meta }) => {
                let itemCount = 0;
                return (
                  <TableRow>
                    <TableCell className={`${classes.borderRight1} ${classes.pd5}`} style={{ backgroundColor: meta?.color }}>
                      {name}
                    </TableCell>
                    {locations.map(({ id: locationId, cityId: locCityId }) => {
                      if (locCityId === 3) {
                        const qty = reports?.[3]?.[locationId]?.[itemId];
                        if (qty) {
                          itemCount += qty;
                        }
                        return (
                          <TableCell className={`${classes.borderRight1} ${classes.pd5}`}>{qty}</TableCell>
                        );
                      }

                      return null;
                    })}
                    <TableCell className={classes.pd5} style={{ width: 210 }}><b>{itemCount > 0 ? itemCount : null}</b></TableCell>
                  </TableRow>
                );
              })
          }
          <TableRow>
            <TableCell className={`${classes.borderRight1} ${classes.pd5}`} />
            {locations.map(({ id: locationId, cityId: locCityId }) => locCityId === 3 && (
            <TableCell className={`${classes.borderRight1} ${classes.pd5}`}>
              <b>{locationCounts?.[3]?.[locationId]}</b>
            </TableCell>
            ))}
            <TableCell className={classes.pd5}><b>{cityCounts?.[3]}</b></TableCell>
          </TableRow>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DailyReports;
