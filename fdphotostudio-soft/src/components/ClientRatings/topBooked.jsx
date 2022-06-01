import React, { createRef } from 'react';
import MaterialTable from 'material-table';
import { API_BASE_URL } from '../../utils';

const TopBooked = () => {
  const tableRef = createRef();

  const updateTable = () => tableRef.current && tableRef.current.onQueryChange();

  const columns = [
    { title: 'ID', field: 'clientId' },
    { title: 'Name', field: 'name', render: (rowData) => <a href={`/wp-admin/admin.php?page=fdphotostudio_soft_client_search&id=${rowData.url}`} target="_blank" rel="noreferrer">{rowData.name}</a> },
    { title: 'Appointments Total', field: 'total' },
    {
      title: 'Appointments Done', field: 'done', sorting: false, render: (rowData) => rowData.done !== 0 && rowData.done,
    },
  ];

  const options = {
    pageSize: 10,
    pageSizeOptions: [10, 25, 50, 100],
    debounceInterval: 1000,
    emptyRowsWhenPaging: false,
  };

  const actions = [
    {
      icon: 'refresh',
      tooltip: 'Refresh Data',
      isFreeAction: true,
      onClick: () => updateTable(),
    },
  ];

  return (
    <MaterialTable
      title="Top Booked"
      tableRef={tableRef}
      columns={columns}
      options={options}
      actions={actions}
      data={(query) => new Promise((resolve) => {
        const {
          search, pageSize, page, orderBy, orderDirection,
        } = query;

        const url = `${API_BASE_URL}/fdsoft/top-booked?search=${search}&perPage=${pageSize}&page=${page + 1}&orderBy=${orderBy?.field}&orderDirection=${orderDirection}`;

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
    />
  );
};

export default TopBooked;
