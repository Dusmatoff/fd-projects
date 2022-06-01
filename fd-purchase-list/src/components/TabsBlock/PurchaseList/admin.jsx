import React, { useState, createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MonetizationOn from '@material-ui/icons/MonetizationOn';
import money from '../../../images/money.png';
import EditModal from './editModal';
import { addPurchase, deletePurchase, addDebitAndCredit } from '../../../actions/purchases';
import { setEmptyPurchaseLogs, setEditPurchase } from '../../../actions/app';
import { getHallsCategories, getUser, isAdmin } from '../../../selectors';
import {
  capacityObject,
  urgencyObject,
  statusesObject,
  urgencyColors,
  statusColors,
  API_BASE_URL,
  defaultStatuses,
} from '../../../utils';
import useStyles from '../../styles';

const AdminPurchaseList = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const tableRef = createRef();

  const hallsCategories = useSelector((state) => getHallsCategories(state));
  const user = useSelector((state) => getUser(state));
  const isUserAdmin = useSelector((state) => isAdmin(state));
  const userId = Number(user.data.id);

  const [initialFormData, setInitialFormData] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleClickOpen = (rowData) => {
    dispatch(setEditPurchase(rowData));
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    dispatch(setEditPurchase(null));
    dispatch(setEmptyPurchaseLogs());
  };

  /* Filter */
  const allCategoriesChecked = {};
  const allCategoriesNotChecked = {};
  hallsCategories.forEach((c) => {
    allCategoriesChecked[c.id] = true;
    allCategoriesNotChecked[c.id] = false;
  });
  const [categories, setCategories] = useState(allCategoriesChecked);
  const handleChangeCategories = (event) => {
    setCategories({ ...categories, [event.target.name]: event.target.checked });
  };
  const checkedCategories = Object.keys(categories).filter((category) => categories[category]);

  const [statuses, setStatuses] = useState(defaultStatuses);
  const handleChangeStatus = (event) => {
    setStatuses({ ...statuses, [event.target.name]: event.target.checked });
  };
  const { requested, ordered, received } = statuses;

  const [showDeleted, setShowDeleted] = useState(false);

  const [dateFrom, setDateFrom] = useState(moment().subtract(1, 'months'));
  const [dateTo, setDateTo] = useState(new Date());
  /* Filter */

  const hallsObject = hallsCategories.reduce((result, item) => {
    result[item.id] = item.name;
    return result;
  }, {});

  const validateFields = (data) => {
    if (Object.keys(data).length === 0) {
      alert('Please add info');
      return false;
    }

    const {
      urgency, whatToBuy, quantity, capacity, locationId,
    } = data;

    if (typeof urgency === 'undefined' || urgency === '') {
      alert('Please choose urgency');
      return false;
    }

    if (typeof whatToBuy === 'undefined' || whatToBuy === '') {
      alert('Please add what to buy');
      return false;
    }

    if (typeof quantity === 'undefined' || quantity === '') {
      alert('Please add valid quantity');
      return false;
    }

    if (typeof capacity === 'undefined' || capacity === '') {
      alert('Please choose units');
      return false;
    }

    if (typeof locationId === 'undefined' || locationId === '') {
      alert('Please choose location');
      return false;
    }

    return true;
  };

  const columns = [
    {
      title: 'Urgency',
      field: 'urgency',
      lookup: urgencyObject,
      initialEditValue: 1,
      render: (rowData) => rowData.urgency,
      cellStyle: (e, rowData) => rowData && {
        backgroundColor: urgencyColors[rowData.urgency],
        width: '5%',
        maxWidth: '5%',
        textAlign: 'center',
      },
      headerStyle: {
        width: '5%',
        maxWidth: '5%',
      },
    },
    { title: 'Product', field: 'whatToBuy' },
    {
      title: 'Qty', field: 'quantity', type: 'numeric', render: (rowData) => +rowData.quantity,
    },
    {
      title: 'Units', field: 'capacity', lookup: capacityObject, filtering: false,
    },
    {
      title: 'Description',
      field: 'description',
      initialEditValue: '',
      editComponent: (props) => (
        <textarea onChange={(e) => props.onChange(e.target.value)}>
          {props.value}
        </textarea>
      ),
    },
    {
      title: 'Link',
      field: 'link',
      initialEditValue: '',
      render: (rowData) => rowData?.link && <a href={rowData.link} target="_blank" rel="noreferrer">Follow the link</a>,
    },
    {
      title: 'Created',
      field: 'dateAdded',
      editable: 'never',
      render: (rowData) => rowData?.dateAdded && <span>{moment.unix(rowData.dateAdded).format('M/DD/YYYY')}</span>,
    },
    {
      title: 'Status',
      field: 'status',
      editable: 'never',
      lookup: statusesObject,
      filterPlaceholder: 'Filter',
      cellStyle: (e, rowData) => rowData && { color: statusColors[rowData.status] },
    },
    { title: 'Location', field: 'locationId', lookup: hallsObject },
    {
      title: 'Author', field: 'userLogin', editable: 'never', sorting: false,
    },
  ];

  const actions = [
    {
      icon: 'create',
      tooltip: 'Edit',
      onClick: (event, rowData) => handleClickOpen(rowData),
    },
    (rowData) => ({
      icon: () => <img src={money} alt="Add credit record" />,
      tooltip: 'Add credit record',
      hidden: rowData.status !== 'ordered' || rowData.debitCreditId !== null,
      onClick: (event, data) => {
        if (window.confirm('Do you want add debit credit?')) {
          Promise.resolve(dispatch(addDebitAndCredit(data)))
            .then(() => runFilter());
        }
      },
    }),
    (rowData) => ({
      icon: () => <MonetizationOn size="small" style={{ color: 'green' }} />,
      tooltip: 'Debit Credit',
      hidden: rowData.debitCreditId === null,
      onClick: (event, data) => {
        window.open(`/wp-admin/admin.php?page=fdphotostudio_soft_debit_and_credit&tab=add-edit&edit=${data.debitCreditId}`, '_blank').focus();
      },
    }),
    {
      icon: 'library_add',
      tooltip: 'Duplicate',
      onClick: (event, rowData) => {
        window.scrollTo(0, 0);
        const materialTable = tableRef.current;

        setInitialFormData({
          ...rowData, urgency: 1, dateAdded: null, status: null, userLogin: null,
        });

        materialTable.dataManager.changeRowEditing();
        materialTable.setState({
          ...materialTable.dataManager.getRenderState(),
          showAddRow: true,
        });
      },
    },
  ];

  const options = {
    actionsColumnIndex: 10,
    addRowPosition: 'first',
    draggable: false,
    toolbarButtonAlignment: 'left',
    search: false,
    pageSize: 10,
    pageSizeOptions: [10, 20, 50],
    debounceInterval: 2000,
    emptyRowsWhenPaging: false,
    doubleHorizontalScroll: true,
    headerStyle: {
      fontWeight: 700,
    },
    rowStyle: (rowData) => rowData && rowData.isDeleted === 1 && { backgroundColor: urgencyColors[4] },
  };

  const runFilter = () => tableRef.current && tableRef.current.onQueryChange();

  const [selectAll, setSelectAll] = React.useState(true);
  const handleChangeSelectAll = (event) => {
    setSelectAll(!selectAll);
    if (event.target.checked) {
      setCategories(allCategoriesChecked);
    } else {
      setCategories(allCategoriesNotChecked);
    }
  };

  return (
    <div>
      <div>
        <FormControl component="fieldset">
          <FormControlLabel
            control={(
              <Checkbox
                checked={selectAll}
                onChange={handleChangeSelectAll}
                color="secondary"
              />
              )}
            label={selectAll ? 'Deselect All' : 'Select All'}
          />
        </FormControl>
      </div>

      <FormControl component="fieldset">
        <FormLabel component="legend">Los Angeles</FormLabel>
        <FormGroup className={classes.flex} style={{ flexDirection: 'row' }}>
          {hallsCategories.map((item) => (
            item.cityId === 1 && (
            <FormControlLabel
              control={(
                <Checkbox
                  checked={categories[item.id]}
                  onChange={handleChangeCategories}
                  size="small"
                  name={item.id}
                />
                )}
              label={item.name}
            />
            )
          ))}
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset">
        <FormLabel component="legend">New York</FormLabel>
        <FormGroup className={classes.flex} style={{ flexDirection: 'row' }}>
          {hallsCategories.map((item) => (
            item.cityId === 2 && (
            <FormControlLabel
              control={(
                <Checkbox
                  checked={categories[item.id]}
                  onChange={handleChangeCategories}
                  size="small"
                  name={item.id}
                />
                )}
              label={item.name}
            />
            )
          ))}
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset">
        <FormLabel component="legend">Chicago</FormLabel>
        <FormGroup className={classes.flex} style={{ flexDirection: 'row' }}>
          {hallsCategories.map((item) => (
            item.cityId === 3 && (
            <FormControlLabel
              control={(
                <Checkbox
                  checked={categories[item.id]}
                  onChange={handleChangeCategories}
                  size="small"
                  name={item.id}
                />
              )}
              label={item.name}
            />
            )
          ))}
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset" className={classes.mgb15}>
        <FormLabel component="legend">Status</FormLabel>
        <FormGroup className={classes.flex} style={{ flexDirection: 'row' }}>
          <FormControlLabel
            control={<Checkbox checked={requested} onChange={handleChangeStatus} name="requested" />}
            label="Requested"
          />
          <FormControlLabel
            control={<Checkbox checked={ordered} onChange={handleChangeStatus} name="ordered" />}
            label="Ordered"
          />
          <FormControlLabel
            control={<Checkbox checked={received} onChange={handleChangeStatus} name="received" />}
            label="Received"
          />
          {isUserAdmin && (
          <FormControlLabel
            control={<Checkbox checked={showDeleted} onChange={() => setShowDeleted(!showDeleted)} />}
            label="Deleted"
          />
          )}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              format="yyyy-MM-dd"
              label="Date added from"
              value={dateFrom}
              onChange={(date) => setDateFrom(date)}
            />
            <KeyboardDatePicker
              format="yyyy-MM-dd"
              label="Date added to"
              value={dateTo}
              onChange={(date) => setDateTo(date)}
              className={classes.ml15}
            />
          </MuiPickersUtilsProvider>
          <Button variant="contained" color="primary" onClick={runFilter} className={classes.ml15} style={{color: 'white'}}>
            Filter
          </Button>
        </FormGroup>
      </FormControl>

      <MaterialTable
        title="Add purchase"
        tableRef={tableRef}
        actions={actions}
        options={options}
        columns={columns}
        initialFormData={initialFormData}
        data={(query) => new Promise((resolve) => {
          const locations = checkedCategories.join();
          const status = Object.keys(statuses).filter((statusName) => statuses[statusName]).join();
          const from = moment(dateFrom).format('X');
          const to = moment(dateTo).add(23, 'hours').add(59, 'minutes').add(59, 'seconds')
            .format('X');
          const page = query.page + 1;
          const perPage = query.pageSize;
          const orderBy = query.orderBy?.field;
          const { orderDirection } = query;
          const url = `${API_BASE_URL}/purchase-list/purchases?locations=${locations}&showDeleted=${Number(showDeleted)}&statuses=${status}&from=${from}&to=${to}&page=${(page)}&perPage=${perPage}&orderBy=${orderBy}&orderDirection=${orderDirection}`;
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
        editable={{
          onRowAdd: (newData) => new Promise((resolve, reject) => {
            if (validateFields(newData)) {
              Promise.resolve(dispatch(addPurchase(newData, userId))).then(() => {
                resolve();
                setInitialFormData({});
              }).catch(() => {
                reject();
              });
            } else {
              reject();
            }
          }),
          onRowDelete: (oldData) => new Promise((resolve, reject) => {
            Promise.resolve(dispatch(deletePurchase(oldData.id))).then(() => {
              resolve();
            }).catch(() => {
              reject();
            });
          }),
        }}
      />
      {showModal && (
      <EditModal
        showModal={showModal}
        hideModal={handleClose}
        runFilter={runFilter}
      />
      )}
      <div className="mgb128" />
    </div>
  );
};

export default AdminPurchaseList;
