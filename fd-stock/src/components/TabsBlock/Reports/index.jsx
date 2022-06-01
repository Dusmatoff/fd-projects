import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { fetchReports } from '../../../store/actions/reports';
import { getCurrentLocation, getReports, isUserAdmin } from '../../../store/selectors';

const Reports = () => {
  const dispatch = useDispatch();

  const locationId = useSelector((state) => getCurrentLocation(state));
  const reports = useSelector((state) => getReports(state));
  const isAdmin = useSelector((state) => isUserAdmin(state));
  const isDeletedParam = isAdmin ? 1 : 0;

  useEffect(() => {
    dispatch(fetchReports(locationId, isDeletedParam));
  }, [locationId]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {reports.map((item) => (
            <TableRow key={item.name}>
              <TableCell component="th" scope="row">
                {item.isDeleted === 0
                  ? (
                    <span style={{ backgroundColor: item.meta?.color, padding: 8, borderRadius: 4 }}>
                      {item.name}
                    </span>
                  )
                  : (
                    <span style={{ backgroundColor: '#e3a3a3', padding: 8, borderRadius: 4 }}>
                      {`${item.name} (Deleted by ${item.meta.deletedBy} - ${moment(item.meta?.deletedDate).format('M/DD/YYYY')})`}
                    </span>
                  )}
              </TableCell>
              {item.reports.map((report) => (
                <TableCell>
                  {moment(report.dateTime).format('M/DD/YYYY')}
                  <br />
                  <b>{report.qty}</b>
                  {' '}
                  {report.userNicename}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Reports;
