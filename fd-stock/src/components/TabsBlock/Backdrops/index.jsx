import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MaterialTable from 'material-table';
import AddItem from './AddItem';
import { getInventory, getCurrentLocation, isUserAdmin } from '../../../store/selectors';
import { addInventory, fetchInventory } from '../../../store/actions/inventory';

const Backdrops = () => {
  const dispatch = useDispatch();

  const currentLocation = useSelector((state) => getCurrentLocation(state));
  const inventory = useSelector((state) => getInventory(state));
  const isAdmin = useSelector((state) => isUserAdmin(state));
  const isDeletedParam = isAdmin ? 1 : 0;

  const columns = [
    {
      title: 'Name',
      field: 'name',
      editable: 'never',
      sorting: false,
      render: (rowData) => {
        if (rowData.isDeleted === 1 && rowData.meta?.deletedBy) {
          return (
            <span style={{ backgroundColor: rowData.meta?.color, padding: 8, borderRadius: 4 }}>
              {rowData.name}
              {' '}
              (Deleted by
              {' '}
              {rowData.meta.deletedBy}
              )
            </span>
          );
        }

        return (<span style={{ backgroundColor: rowData.meta?.color, padding: 8, borderRadius: 4 }}>{rowData.name}</span>);
      },
    },
    {
      title: 'QTY CURRENT', field: 'qty', editable: 'never', sorting: false,
    },
    {
      title: 'QTY NEW',
      field: 'new_qty',
      sorting: false,
      textAlign: 'left',
      // maxWidth: '150px',
      type: 'number',
      validate: (rowData) => (rowData.new_qty < 0 ? { isValid: false, helperText: 'Value cannot be negative' } : true),
    },
  ];

  useEffect(() => {
    if (currentLocation) {
      dispatch(fetchInventory(currentLocation, isDeletedParam));
    }
  }, [currentLocation]);

  return (
    <div>
      <AddItem />
      <br />
      <MaterialTable
        title="EDIT BACKDROPS"
        options={{
          paging: false,
          search: false,
          toolbarButtonAlignment: 'left',
          actionsColumnIndex: 3,
          rowStyle: (rowData) => {
            if (rowData && rowData.isDeleted === 1) return { backgroundColor: '#e3a3a3' };
          },
        }}
        columns={columns}
        data={inventory}
        editable={{
          onBulkUpdate: (changes) => new Promise((resolve, reject) => {
            if (Object.keys(changes).length > 0) {
              console.log('changes', changes);
              Promise.resolve(dispatch(addInventory(changes, currentLocation))).then(() => {
                dispatch(fetchInventory(currentLocation, isDeletedParam));
              }).then(() => {
                resolve();
              }).catch(() => {
                reject();
              });
            } else {
              resolve();
            }
          }),
        }}
      />
    </div>
  );
};

export default Backdrops;
