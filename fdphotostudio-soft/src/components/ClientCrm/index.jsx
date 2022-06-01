import React, { createRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MaterialTable from 'material-table';
import AddClient from './add';
import { API_BASE_URL } from '../../utils';
import { fetchCurrentUser } from '../../store/actions/user';
import { isUserFetched } from '../../store/selectors';

const ClientCrm = () => {
  const dispatch = useDispatch();

  const userFetched = useSelector((state) => isUserFetched(state));

  const tableRef = createRef();

  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const updateTable = () => tableRef.current && tableRef.current.onQueryChange();

  const columns = [
    { title: 'ID', field: 'id', render: (rowData) => <a href={`/wp-admin/admin.php?page=fdphotostudio_soft_client_search&id=${rowData.url}`} target="_blank" rel="noreferrer">{rowData.id}</a> },
    { title: 'Name', field: 'name', render: (rowData) => <a href={`/wp-admin/admin.php?page=fdphotostudio_soft_client_search&id=${rowData.url}`} target="_blank" rel="noreferrer">{rowData.name}</a> },
    {
      title: 'Email',
      field: 'email',
      render: (rowData) => (
        <span>
          {rowData.email}
          <br />
          {rowData.email2}
        </span>
      ),
    },
    { title: 'Phone', field: 'phone' },
    { title: 'Comments', field: 'comments' },
  ];

  const options = {
    pageSize: 10,
    pageSizeOptions: [10, 25, 50, 100],
    debounceInterval: 1000,
    emptyRowsWhenPaging: false,
  };

  const actions = [
    {
      icon: 'add',
      tooltip: 'Add Client',
      isFreeAction: true,
      onClick: () => handleOpen(),
    },
    {
      icon: 'refresh',
      tooltip: 'Refresh Data',
      isFreeAction: true,
      onClick: () => updateTable(),
    },
  ];

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);

  return (

    <div>
      {userFetched
        && (
        <MaterialTable
          title="Clients CRM"
          tableRef={tableRef}
          columns={columns}
          options={options}
          actions={actions}
          data={(query) => new Promise((resolve) => {
            const {
              search, pageSize, page, orderBy, orderDirection,
            } = query;

            const url = `${API_BASE_URL}/fdsoft/client-crm?search=${search}&perPage=${pageSize}&page=${page + 1}&orderBy=${orderBy?.field}&orderDirection=${orderDirection}`;

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
        )}
      {showModal && (<AddClient show={showModal} handleClose={handleClose} updateTable={updateTable} />)}
    </div>
  );
};

export default ClientCrm;
