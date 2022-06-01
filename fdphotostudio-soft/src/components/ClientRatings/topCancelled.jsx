import React, { createRef } from 'react';
import MaterialTable from 'material-table';
import { API_BASE_URL } from '../../utils';

const TopCancelled = () => {
  const tableRef = createRef();

  const updateTable = () => tableRef.current && tableRef.current.onQueryChange();

  const columns = [
    { title: 'ID', field: 'clientId' },
    { title: 'Name', field: 'name' },
    { title: 'Appointments Cancelled', field: 'total' },
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
      title="Top Cancelled"
      tableRef={tableRef}
      columns={columns}
      options={options}
      actions={actions}
      data={(query) => new Promise((resolve) => {
        const {
          search, pageSize, page, orderBy, orderDirection,
        } = query;

        const url = `${API_BASE_URL}/fdsoft/top-cancelled?search=${search}&perPage=${pageSize}&page=${page + 1}&orderBy=${orderBy?.field}&orderDirection=${orderDirection}`;

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

export default TopCancelled;
