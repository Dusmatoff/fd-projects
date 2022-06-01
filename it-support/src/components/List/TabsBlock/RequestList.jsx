import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import RequestDetails from './RequestDetails';
import { GreyButton } from '../../buttons';
import {
  updateRequest, fetchRequests, deleteRequest, fetchRequestsUpdates, setRequestUpdate, fetchRequestComments,
} from '../../../store/actions/requests';
import { isUserAdmin, getUpdates } from '../../../store/selectors';
import { requestStatuses } from '../../../utils';
import useStyles from '../../styles';

export default function RequestList({ requests, slug }) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const isAdmin = useSelector((state) => isUserAdmin(state));
  const updates = useSelector((state) => getUpdates(state));

  const [showDetails, setShowDetails] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);

  const allColumns = [
    {
      title: 'ID', field: 'id', hidden: true,
    },

    {
      title: 'Date', field: 'dateCreated', editable: 'never',
    },
    {
      title: 'Title',
      field: 'title',
      editable: 'never',
      render: (rowData) => (updates.statuses[slug].includes(rowData.id) ? (
        <b>
          ●
          {rowData.title}
        </b>
      ) : rowData.title),
    },
    {
      title: 'Author', field: 'displayName', hidden: !isAdmin, editable: 'never',
    },
    {
      title: 'Status', field: 'status', lookup: requestStatuses, hidden: !isAdmin,
    },
  ];

  const columns = [
    {
      title: 'ID', field: 'id', hidden: true,
    },
    {
      title: 'Title',
      field: 'title',
      editable: 'never',
      render: (rowData) => (updates.statuses[slug].includes(rowData.id) ? (
        <b>
          ●
          {rowData.title}
        </b>
      ) : rowData.title),
    },
  ];

  const options = {
    search: false,
    showTitle: false,
    toolbar: false,
    actionsColumnIndex: 5,
    pageSize: 10,
    pageSizeOptions: [10, 15, 20],
    emptyRowsWhenPaging: false,
    rowStyle: (rowData) => rowData.id === currentRequest?.id && { backgroundColor: '#E0E0E0' },
  };

  const hideRequestDetails = () => {
    setShowDetails(false);
    setCurrentRequest(null);
  };

  return (
    <Grid container spacing={2} className={`${classes.root} ${classes.mobcolumn}`}>
      <Grid item xs={12} sm={showDetails ? 4 : 12} className={!showDetails && classes.supportTable} id="support-table">
        <MaterialTable
          columns={showDetails ? columns : allColumns}
          data={requests}
          localization={{
            header: {
              actions: '',
            },
          }}
          options={options}
          onRowClick={(event, rowData) => {
            Promise.resolve(setCurrentRequest(rowData))
              .then(() => setShowDetails(true))
              .then(() => dispatch(fetchRequestComments(rowData.id)))
              .then(() => dispatch(setRequestUpdate(rowData.id)))
              .then(() => dispatch(fetchRequestsUpdates()));
          }}
          editable={{
            isEditable: (rowData) => isAdmin || (!isAdmin && rowData.status === 'pending'),
            isEditHidden: (rowData) => !isAdmin  || showDetails,
            isDeletable: (rowData) => rowData.status === 'pending',
            isDeleteHidden: (rowData) => rowData.status !== 'pending'  || showDetails,
            onRowUpdate: (newData) => new Promise((resolve) => {
              Promise.resolve(dispatch(updateRequest(newData)))
                .then(() => dispatch(fetchRequests()))
                .then(() => {
                  dispatch(fetchRequestsUpdates());
                })
                .then(() => {
                  resolve('Request updated');
                });
            }),
            onRowDelete: (oldData) => new Promise((resolve) => {
              Promise.resolve(dispatch(deleteRequest(oldData.id))).then(() => {
                dispatch(fetchRequests());
              }).then(() => {
                dispatch(fetchRequestsUpdates());
              }).then(() => {
                resolve('Request deleted');
              });
            }),
          }}
        />
      </Grid>
      {showDetails && (
      <Grid item xs={12} sm={8}>
        <GreyButton className={classes.mrb15} variant="contained" color="black" size="small" startIcon={<ArrowBackIcon />} onClick={hideRequestDetails}>
          Back
        </GreyButton>
        <RequestDetails request={currentRequest} />
      </Grid>
      )}
    </Grid>
  );
}
