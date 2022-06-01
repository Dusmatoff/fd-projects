import React from 'react';
import { useDispatch } from 'react-redux';
import Parser from 'html-react-parser';
import moment from 'moment';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Delete from '@material-ui/icons/Delete';
import { GreenButton } from '../../../../buttons';
import {
  fetchPackages, deletePackageHours, deleteSpentHours, addSpentHours,
} from '../../../../../actions/packages';
import { fetchTransactions } from '../../../../../actions/transactions';
import useStyles from '../../../../styles';

const PackageItem = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const {
    pack, currentStudioId, isManagerRole, bookingId,
  } = props;

  const {
    left_hours: leftHours,
    hours_in_package: hoursInPackage,
    used_hours: usedHours,
    id,
    txn_ids: txnIds,
    package_count: packageCount,
    package_name: packageName,
    stage,
    username,
    timestamp,
    client_id: clientId,
    deleted,
  } = pack;

  const [spentHours, setSpentHours] = React.useState(1);
  const handleChangeHours = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSpentHours(event.target.value as number);
  };
  const hoursList = [];
  for (let i = 1; i <= leftHours; i += 1) {
    hoursList.push(i);
  }

  let txnInfo: any = '';
  if (txnIds.includes('77')) {
    txnInfo = 'Gift';
  } else if (isManagerRole) {
    txnInfo = txnIds.map((txnId) => ` <a target="_blank" href="/wp-admin/admin.php?page=fdphotostudio_soft_transcations&edit_transaction=${txnId}">Txn#${txnId}</a>`);
  } else {
    txnInfo = txnIds.map((txnId) => `Txn#${txnId}`);
  }

  const accordionTitle = `Left: ${leftHours} | Bought : ${hoursInPackage} | Used : ${usedHours} | #${id} &nbsp;${txnInfo}`;

  const deletePackageClick = (deleteId) => {
    if (window.confirm('Are you sure want to delete package?')) {
      Promise.resolve(dispatch(deletePackageHours(deleteId, clientId))).then(() => {
        dispatch(fetchPackages(clientId));
        dispatch(fetchTransactions(bookingId));
      });
    }
  };

  const deleteHoursClick = (spentId) => {
    if (window.confirm('Are you sure want to delete hours?')) {
      Promise.resolve(dispatch(deleteSpentHours(spentId, clientId))).then(() => {
        dispatch(fetchPackages(clientId));
        dispatch(fetchTransactions(bookingId));
      });
    }
  };

  const editableStamp = (Date.now() / 1000 | 0) - 30 * 60;
  const canDeleteHours = (hourStamp) => isManagerRole || hourStamp > editableStamp;

  const addHoursClick = () => {
    const values = {
      stageId: currentStudioId,
      packageId: id,
      bookingId,
      hours: spentHours,
      clientId,
    };

    Promise.resolve(dispatch(addSpentHours(values))).then(() => {
      dispatch(fetchPackages(clientId));
    });
  };

  const deleteInfo = (item) => {
    if (item.delete_by && item.delete_date) {
      const label = `Deleted by ${item.delete_by} at ${moment.utc(item.delete_date, 'YYYY-MM-DD h:mm:ss').format('MM.DD.YY h:mm')}`;
      return (
        <div className={classes.deleteInfo}>{label}</div>
      );
    }

    return null;
  };

  const isDeleted = deleted === '1';
  const canAddHours = leftHours > 0 && !isDeleted;

  return (
    <Accordion className={isDeleted && classes.deletedPackage} defaultExpanded={leftHours !== 0}>
      <AccordionSummary className={classes.pd0} expandIcon={<ExpandMore />}>
        {isManagerRole
          ? (
            <IconButton
              color="secondary"
              className={classes.paddingZero}
              onClick={() => deletePackageClick(id)}
            >
              <Delete />
            </IconButton>
          )
          : <span />}
        {Parser(accordionTitle)}
        {isDeleted && deleteInfo(pack)}
      </AccordionSummary>
      <AccordionDetails className={`${classes.dBlock} ${classes.paddingPackages}`}>
        <Table padding="none">
          <TableHead>
            <TableRow>
              <TableCell component="th" scope="row">
                <i className="fa fa-plus" />
                {' '}
                {hoursInPackage}
              </TableCell>
              <TableCell component="th" scope="row" className={classes.border}>
                {`${packageCount} x ${packageName}`}
              </TableCell>
              <TableCell component="th" scope="row" className={classes.border}>{stage}</TableCell>
              <TableCell component="th" scope="row" className={classes.border}>{username}</TableCell>
              <TableCell component="th" scope="row" className={classes.border}>
                {moment.unix(timestamp).format('MM.DD.YY')}
              </TableCell>
              <TableCell component="th" scope="row" />
            </TableRow>
          </TableHead>
          <TableBody>
            {pack.spent_hours && pack.spent_hours.map((item) => (
              <TableRow className={item.deleted === '1' && classes.deletedPackage}>
                <TableCell component="th" scope="row">
                  <i className="fa fa-minus" />
                  {' '}
                  {item.hours}
                </TableCell>
                <TableCell component="th" scope="row" className={classes.border}>
                  <a
                    href={`/wp-admin/admin.php?page=update-appointment&updateid=${item.appointment_id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Booking #
                    {item.appointment_id}
                  </a>
                  {item.deleted === '1' && deleteInfo(item)}
                </TableCell>
                <TableCell component="th" scope="row" className={classes.border}>{item.stage}</TableCell>
                <TableCell component="th" scope="row" className={classes.border}>{item.username}</TableCell>
                <TableCell component="th" scope="row" className={classes.border}>
                  {moment.unix(item.timestamp).format('MM.DD.YY')}
                </TableCell>
                <TableCell component="th" scope="row">
                  {canDeleteHours(item.timestamp)
                    ? <IconButton color="secondary" size="small" onClick={() => deleteHoursClick(item.id)}><Delete /></IconButton>
                    : <span />}
                </TableCell>
              </TableRow>

            ))}
          </TableBody>
        </Table>
        {canAddHours && (
        <div>
          <Select
            name="spentHours"
            value={spentHours}
            onChange={handleChangeHours}
          >
            {hoursList.map((i) => <MenuItem value={i}>{i}</MenuItem>)}
          </Select>
          Client used

          <GreenButton variant="contained" className={classes.margin} onClick={addHoursClick}>
            Add
          </GreenButton>
        </div>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default PackageItem;
