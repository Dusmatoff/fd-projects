import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MaterialTable from 'material-table';
import {
  fetchItems, addItem, updateItem, deleteItem,
} from '../../../store/actions/items';
import {
  getCategories, getItems, isUserWorker, isUserAdmin,
} from '../../../store/selectors';

const Items = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => getCategories(state));
  const items = useSelector((state) => getItems(state));
  const isWorker = useSelector((state) => isUserWorker(state));
  const isAdmin = useSelector((state) => isUserAdmin(state));
  const isDeletedParam = isAdmin ? 1 : 0;

  const formattedCategories = categories.reduce((prev, current) => ({ ...prev, [current.id]: current.name }), {});

  const columns = [
    {
      title: 'Name',
      field: 'name',
      sorting: false,
      render: (rowData) => {
        if (rowData.isDeleted === 1 && rowData.meta?.deletedBy) {
          return (
            <span>
              {rowData.name}
              {' '}
              (Deleted by
              {' '}
              {rowData.meta.deletedBy}
              )
            </span>
          );
        }

        return (<span>{rowData.name}</span>);
      },
    },
    {
      title: 'Category', field: 'categoryId', sorting: false, lookup: formattedCategories,
    },
    { title: 'Description', field: 'description', sorting: false },
    {
      title: 'Color',
      field: 'color',
      sorting: false,
      editComponent: (props) => (
        <input type="color" value={props.value} onChange={(e) => props.onChange(e.target.value)} />
      ),
      render: (rowData) => (
        <span style={{
          backgroundColor: rowData.meta?.color, width: 35, height: 25, display: 'block',
        }}
        />
      ),
    },
    {
      title: 'Order', field: 'orderNumber', sorting: false, type: 'numeric',
    },
  ];

  const validateFields = (data) => {
    console.log('data', data);
    if (Object.keys(data).length === 0) {
      alert('Please add info');
      return false;
    }

    const { name, categoryId, orderNumber } = data;

    if (typeof name === 'undefined' || name === '') {
      alert('Please add name');
      return false;
    }

    if (typeof categoryId === 'undefined' || categoryId === '') {
      alert('Please choose category');
      return false;
    }

    if (typeof orderNumber === 'undefined' || Number.isNaN(orderNumber) || Number(orderNumber) < 1) {
      alert('Please add valid order number');
      return false;
    }

    return true;
  };

  return (
    <MaterialTable
      title="ADD ITEM"
      options={{
        addRowPosition: 'first',
        draggable: false,
        paging: false,
        toolbarButtonAlignment: 'left',
        search: false,
        actionsColumnIndex: 5,
        rowStyle: (rowData) => {
          if (rowData && rowData.isDeleted === 1) return { backgroundColor: '#e3a3a3' };
        },
      }}
      columns={columns}
      data={items}
      editable={{
        isDeletable: () => !isWorker,
        isDeleteHidden: () => isWorker,
        onRowAdd: (newData) => new Promise((resolve, reject) => {
          if (validateFields(newData)) {
            Promise.resolve(dispatch(addItem(newData))).then(() => {
              dispatch(fetchItems(isDeletedParam));
            }).then(() => {
              resolve();
            });
          } else {
            reject();
          }
        }),
        onRowUpdate: (newData) => new Promise((resolve, reject) => {
          if (validateFields(newData)) {
            Promise.resolve(dispatch(updateItem(newData))).then(() => {
              dispatch(fetchItems(isDeletedParam));
            }).then(() => {
              resolve();
            });
          } else {
            reject();
          }
        }),
        onRowDelete: (oldData) => new Promise((resolve) => {
          Promise.resolve(dispatch(deleteItem(oldData.id))).then(() => {
            dispatch(fetchItems(isDeletedParam));
          }).then(() => {
            resolve();
          });
        }),
      }}
    />
  );
};

export default Items;
