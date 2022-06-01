import React from 'react';
import MaterialTable from 'material-table';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import OrderItems from './orderItems';
import useStyles from '../../styles';
import colors from "../../../../../../../colors";

const Orders = () => {
  const classes = useStyles();

  const tableRef = React.createRef();

  const runFilter = () => tableRef.current && tableRef.current.onQueryChange();

  const columns = [
    {
      title: 'Appointment',
      field: 'booking_id',
      sorting: true,
      render: (rowData) => (
        <a
          href={`/wp-admin/admin.php?page=update-appointment&updateid=${rowData.booking_id}`}
          target="_blank"
          rel="noreferrer"
        >
          {rowData.booking_id}
        </a>
      ),
    },
    {
      title: 'Transaction',
      field: 'transaction_id',
      sorting: true,
      render: (rowData) => (
        <a
          href={`/wp-admin/admin.php?page=fdphotostudio_soft_transcations&edit_transaction=${rowData.transaction_id}`}
          target="_blank"
          rel="noreferrer"
        >
          {rowData.transaction_id}
        </a>
      ),
    },
    { title: 'Status', field: 'status', sorting: true },
    { title: 'Total', field: 'total', sorting: true },
    { title: 'Created at', field: 'created_at', sorting: true },
  ];

  /* Filter fields */
  const defaultStatuses = {
    created: true,
    refund: true,
    deleted: true,
    voided: true,
    authorized: true,
  };

  const [statuses, setStatuses] = React.useState(JSON.parse(localStorage.getItem('fdShopOrderStatuses')) || defaultStatuses);

  React.useEffect(() => {
    localStorage.setItem('fdShopOrderStatuses', JSON.stringify(statuses));
  }, [statuses]);

  const handleChangeStatus = (event) => {
    setStatuses({ ...statuses, [event.target.name]: event.target.checked });
  };

  const {
    created, refund, deleted, voided, authorized,
  } = statuses;

  const checkedStatuses = Object.keys(statuses).filter((status) => statuses[status]);

  const monthAgo = new Date(new Date().setDate(new Date().getDate() - 30));
  const [dateFrom, setDateFrom] = React.useState(monthAgo);
  const [dateTo, setDateTo] = React.useState(new Date());

  const [search, setSearch] = React.useState('');
  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
  };
  /* Filter fields */

  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <FormControl component="fieldset" style={{ marginBottom: 15 }}>
          <FormLabel component="legend">Status</FormLabel>
          <FormGroup className={classes.flex} style={{ flexDirection: 'row' }}>
            <FormControlLabel
              control={<Checkbox style={{color: colors.color25 }} checked={created} onChange={handleChangeStatus} name="created" />}
              label="Created"
            />
            <FormControlLabel
              control={<Checkbox style={{color: colors.color25 }} checked={refund} onChange={handleChangeStatus} name="refund" />}
              label="Refund"
            />
            <FormControlLabel
              control={<Checkbox style={{color: colors.color25 }} checked={deleted} onChange={handleChangeStatus} name="deleted" />}
              label="Deleted"
            />
            <FormControlLabel
              control={<Checkbox style={{color: colors.color25 }} checked={voided} onChange={handleChangeStatus} name="voided" />}
              label="Voided"
            />
            <FormControlLabel
              control={<Checkbox style={{color: colors.color25 }} checked={authorized} onChange={handleChangeStatus} name="authorized" />}
              label="Authorized"
            />
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
              onChange={(date) => setDateTo(date)}
              className={classes.ml15}
            />
            <TextField
              placeholder="Search text"
              className={classes.ml15}
              value={search}
              onChange={handleChangeSearch}
            />
            <Button variant="contained"  onClick={runFilter} className={`${classes.ml15} ${classes.GreenButton}`}>
              Filter
            </Button>
          </FormGroup>
        </FormControl>
      </MuiPickersUtilsProvider>
      <MaterialTable
        title="Orders"
        tableRef={tableRef}
        columns={columns}
        options={{
          pageSize: 50,
          pageSizeOptions: [50, 100],
          debounceInterval: 2000,
          search: false,
          emptyRowsWhenPaging: false,
        }}
        data={(query) => new Promise((resolve) => {
          const perPage = query.pageSize;
          const page = query.page + 1;
          const status = checkedStatuses.join();
          const from = moment(dateFrom).format('X');
          const to = moment(dateTo).add(23, 'hours').add(59, 'minutes').add(59, 'seconds')
            .format('X');
          const orderBy = query.orderBy?.field;
          const { orderDirection } = query;
          const url = `/wp-admin/admin-ajax.php?action=fd_shop_get_orders&per_page=${perPage}&page=${page}&statuses=${status}&date_from=${from}&date_to=${to}&orderBy=${orderBy}&orderDirection=${orderDirection}&search=${search}`;
          fetch(url)
            .then((response) => response.json())
            .then((result) => {
              resolve({
                data: result.data,
                page: result.page - 1,
                totalCount: result.total,
              });
            });
        })}
        detailPanel={(rowData) => <OrderItems items={rowData.items} />}
      />
    </div>
  );
};

export default Orders;
