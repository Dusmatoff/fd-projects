import React, { createRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { addPurchase, updatePurchase, deletePurchase } from '../../../actions/purchases';
import { getHallsCategories, getUser } from '../../../selectors';
import {
  capacityObject, urgencyObject, statusesObject, urgencyColors, statusColors, API_BASE_URL,
} from '../../../utils';
import receivedImage from '../../../images/received.png';
import useStyles from '../../styles';

const WorkerPurchaseList = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [initialFormData, setInitialFormData] = useState({});

  const hallsCategories = useSelector((state) => getHallsCategories(state));
  const user = useSelector((state) => getUser(state));
  const userId = Number(user.data.id);

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
      urgency, whatToBuy, quantity, capacity,
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
      alert('Please choose capacity');
      return false;
    }

    return true;
  };

  const isLocationDetected = user.location.length !== 0 && Object.keys(user.location) !== 0;

  const columns = [
    {
      title: 'Urgency',
      field: 'urgency',
      lookup: urgencyObject,
      initialEditValue: 1,
      sorting: false,
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
      title: 'Qty', field: 'quantity', type: 'numeric', sorting: false, render: (rowData) => +rowData.quantity,
    },
    {
      title: 'Units', field: 'capacity', sorting: false, lookup: capacityObject,
    },
    {
      title: 'Description',
      field: 'description',
      initialEditValue: '',
      sorting: false,
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
      sorting: false,
      render: (rowData) => rowData.link && <a href={rowData.link} target="_blank" rel="noreferrer">Follow the link</a>,
    },
    {
      title: 'Created',
      field: 'dateAdded',
      editable: 'never',
      sorting: false,
      render: (rowData) => rowData?.dateAdded && <span>{moment.unix(rowData.dateAdded).format('M/DD/YYYY')}</span>,
    },
    {
      title: 'Status',
      field: 'status',
      editable: 'never',
      lookup: statusesObject,
      sorting: false,
      cellStyle: (e, rowData) => rowData && { color: statusColors[rowData.status] },
    },
    {
      title: 'Location', field: 'locationId', lookup: hallsObject, editable: 'never',
    },
  ];

  const actions = [
    (rowData) => ({
      icon: () => <img src={receivedImage} alt="Received" />,
      tooltip: 'Received',
      hidden: rowData.status !== 'ordered',
      onClick: (event, data) => {
        if (window.confirm('Do you change status to received?')) {
          data.status = 'received';
          data.dateDelivery = null;
          Promise.resolve(dispatch(updatePurchase(data)))
            .then(() => runFilter());
        }
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
    actionsColumnIndex: 9,
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
  };

  /* Filter */
  const [dateFrom, setDateFrom] = useState(moment().subtract(1, 'months'));
  const [dateTo, setDateTo] = useState(new Date());

  const tableRef = createRef();

  const runFilter = () => tableRef.current && tableRef.current.onQueryChange();
  /* Filter */

  return (
    <div>
      <FormControl component="fieldset" className={classes.margin2}>
        <FormGroup className={classes.flex} style={{ flexDirection: 'row' }}>
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
          <Button variant="contained" color="secondary" onClick={runFilter} className={classes.ml15}>
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
          const from = moment(dateFrom).format('X');
          const to = moment(dateTo).add(23, 'hours').add(59, 'minutes').add(59, 'seconds')
            .format('X');
          const page = query.page + 1;
          const perPage = query.pageSize;
          const orderBy = query.orderBy?.field;
          const { orderDirection } = query;
          const url = `${API_BASE_URL}/purchase-list/purchases?from=${from}&to=${to}&page=${(page)}&perPage=${perPage}&orderBy=${orderBy}&orderDirection=${orderDirection}`;
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
          isEditable: (rowData) => rowData.status === 'requested' && rowData.userId === userId,
          isEditHidden: (rowData) => rowData.status !== 'requested' || rowData.userId !== userId,
          isDeletable: (rowData) => rowData.status === 'requested' && rowData.userId === userId,
          isDeleteHidden: (rowData) => rowData.status !== 'requested' || rowData.userId !== userId,
          onRowAdd: (newData) => new Promise((resolve, reject) => {
            if (isLocationDetected) {
              if (validateFields(newData)) {
                newData.locationId = user.location[0].id;
                Promise.resolve(dispatch(addPurchase(newData, userId))).then(() => {
                  resolve();
                  setInitialFormData({});
                });
              } else {
                reject();
              }
            } else {
              alert('You can add only inside location');
              reject();
            }
          }),
          onRowUpdate: (newData) => new Promise((resolve, reject) => {
            if (validateFields(newData)) {
              Promise.resolve(dispatch(updatePurchase(newData))).then(() => {
                resolve();
              });
            } else {
              reject();
            }
          }),
          onRowDelete: (oldData) => new Promise((resolve) => {
            Promise.resolve(dispatch(deletePurchase(oldData.id))).then(() => {
              resolve();
            });
          }),
        }}
      />
      <div className="mgb128" />
    </div>
  );
};

export default WorkerPurchaseList;
