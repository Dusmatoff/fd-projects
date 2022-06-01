import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import MaterialTable from 'material-table';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import IconButton from '@material-ui/core/IconButton';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Delete from '@material-ui/icons/Delete';
import Restore from '@material-ui/icons/Restore';
import Used from './used';
import OrderItems from './orderItems';
import { getBookingId, getTransactions } from '../../../../selectors';
import {
  chargeAuthorizeTransaction,
  deleteTransaction,
  fetchTransactions,
  getErrorInfo,
  refundAuthorizeTransaction,
  restoreTransaction,
  voidAuthorizeTransaction,
} from '../../../../actions/transactions';
import {
  BlueButton, GreyButton, PinkButton, RedButton,
} from '../../../buttons';
import useStyles from '../../../styles';

const Transactions = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const bookingId = useSelector((state) => getBookingId(state));
  const transactions = useSelector((state) => getTransactions(state));

  const isAdmin = transactions.is_admin;
  const canRefund = transactions.can_refund;

  /* Refund modal */
  const [showModal, setShowModal] = React.useState(false);
  const [refundId, setRefundId] = React.useState('');
  const [refundTransactionId, setRefundTransactionId] = React.useState('');

  const openModal = (id, transactionId) => {
    setRefundId(id);
    setRefundTransactionId(transactionId);
    setShowModal(true);
  };
  if (transactions.items.length === 0) {
    return null;
  }
  const closeModal = () => {
    setShowModal(false);
  };

  const canRefundTxn = (can, item) => can && item.auth_txn && item.auth_txn.authorize_status === 'settledSuccessfully';

  const validationSchema = Yup.object({
    type: Yup.string().required('Please choose type'),
    amount: Yup.number().when('type', {
      is: (type) => type === 'partial',
      then: Yup.number().required(),
    }),
  });

  const initialValues = {
    type: 'full',
    amount: 0,
    refundId,
    refundTransactionId,
  };
    /* Refund modal */

  const deleteTx = (transactionId) => {
    if (window.confirm('Confirm delete transaction?')) {
      Promise.resolve(dispatch(deleteTransaction(transactionId, bookingId))).then(() => {
        dispatch(fetchTransactions(bookingId));
      });
    }
  };

  const restoreTx = (transactionId) => {
    Promise.resolve(dispatch(restoreTransaction(transactionId, bookingId))).then(() => {
      dispatch(fetchTransactions(bookingId));
    });
  };

  const chargeTx = (id, transactionId, relatedId) => {
    if (window.confirm('Are you sure want to charge transaction?')) {
      Promise.resolve(dispatch(chargeAuthorizeTransaction(id, transactionId, relatedId))).then(() => {
        dispatch(fetchTransactions(bookingId));
      });
    }
  };

  const voidTx = (id, transactionId) => {
    if (window.confirm('Are you sure want to void transaction?')) {
      Promise.resolve(dispatch(voidAuthorizeTransaction(id, transactionId))).then(() => {
        dispatch(fetchTransactions(bookingId));
      });
    }
  };

  const cellStyles = {
    padding: 6, fontSize: 14, align: 'center', backgroundColor: 'transparent',
  };

  const adminColumns = [
    {
      title: 'ID',
      field: 'transaction_id',
      cellStyle: cellStyles,
      render: (rowData) => (
        <a
          href={`/wp-admin/admin.php?page=fdphotostudio_soft_transcations&edit_transaction=${rowData.transaction_id}`}
          target="_blank"
          className={rowData.pay_type}
          rel="noreferrer"
        >
          {rowData.transaction_id}
          <br />
          {rowData.manual_type !== null && `${rowData.manual_type} ${rowData.txn_number}`}
        </a>
      ),
    },
    { title: 'Date', field: 'date', cellStyle: cellStyles },
    { title: 'Author', field: 'author_name', cellStyle: cellStyles },
    { title: 'Order', field: 'order_id', cellStyle: cellStyles },
    { title: 'Type', field: 'txnTypeName', cellStyle: cellStyles },
    {
      title: 'Amount',
      field: 'amount',
      cellStyle: cellStyles,
      render: (rowData) => (
        <>
          {rowData.amount}
          {rowData.packages.length > 0 && <Used transaction={rowData} />}
        </>
      ),
    },
    {
      title: 'Actions',
      field: 'actions',
      render: (item) => (
        <>
          {item.auth_txn && item.auth_txn.authorize_status === 'authorizedPendingCapture'
                    && (
                    <>
                      <BlueButton
                        variant="contained"
                        size="small"
                        className={classes.transactionBtn}
                        onClick={() => chargeTx(item.auth_txn.id, item.auth_txn.trans_id, item.auth_txn.related_id)}
                      >
                        Charge
                      </BlueButton>
                      <PinkButton
                        variant="contained"
                        size="small"
                        className={classes.transactionBtn}
                        onClick={() => voidTx(item.auth_txn.id, item.auth_txn.trans_id)}
                      >
                        Void
                      </PinkButton>
                    </>
                    )}

          {item.auth_txn && item.auth_txn.authorize_status === 'capturedPendingSettlement'
                    && (
                    <RedButton
                      variant="contained"
                      size="small"
                      className={classes.transactionBtn}
                      onClick={() => voidTx(item.auth_txn.id, item.auth_txn.trans_id)}
                    >
                      Void
                    </RedButton>
                    )}

          {canRefundTxn(canRefund, item)
                    && (
                    <GreyButton
                      variant="contained"
                      size="small"
                      className={classes.transactionBtn}
                      onClick={() => openModal(item.auth_txn.id, item.auth_txn.trans_id)}
                    >
                      Refund
                    </GreyButton>
                    )}

          {item.auth_txn && item.auth_txn.authorize_status === 'Error'
                    && (
                    <RedButton
                      variant="contained"
                      size="small"
                      className={classes.transactionBtn}
                      onClick={() => dispatch(getErrorInfo(item.auth_txn.id))}
                    >
                      Error Info
                    </RedButton>
                    )}

          {item.auth_txn && item.auth_txn.authorize_status === 'voided' && <span>voided</span>}
          {item.status === 'refund' && <small>refunded</small>}
          {!item.auth_txn && item.status === 'created'
                    && (
                    <IconButton
                      size="small"
                      color="secondary"
                      title="Delete"
                      onClick={() => deleteTx(item.transaction_id)}
                    >
                      <Delete />
                    </IconButton>
                    )}

          {!item.auth_txn && item.status === 'deleted'
                    && (
                    <IconButton
                      size="small"
                      title="Restore"
                      onClick={() => restoreTx(item.transaction_id)}
                    >
                      <Restore />
                    </IconButton>
                    )}
        </>
      ),
    },
  ];

  const workerColumns = [
    {
      title: 'ID',
      field: 'transaction_id',
      cellStyle: cellStyles,
      render: (rowData) => (
        <a
          href={`/wp-admin/admin.php?page=fdphotostudio_soft_transcations&edit_transaction=${rowData.transaction_id}`}
          target="_blank"
          className={rowData.pay_type}
          rel="noreferrer"
        >
          {rowData.transaction_id}
          <br />
          {rowData.manual_type !== null && `${rowData.manual_type} ${rowData.txn_number}`}
        </a>
      ),
    },
    { title: 'Date', field: 'date', cellStyle: cellStyles },
    { title: 'Author', field: 'author_name', cellStyle: cellStyles },
    {
      title: 'Order',
      field: 'order_id',
      cellStyle: cellStyles,
      render: (rowData) => (
        <>
          {rowData.order_id}
          {rowData.packages.length > 0 && <Used transaction={rowData} />}
        </>
      ),
    },
    { title: 'Type', field: 'txnTypeName', cellStyle: cellStyles },
    { title: 'Amount', field: 'amount', cellStyle: cellStyles },
  ];

  return (
    <>
      <MaterialTable
        options={{
          draggable: false,
          paging: false,
          showTitle: false,
          search: false,
          padding: 'dense',
          maxBodyHeight: 500,
          sorting: false,
          toolbar: false,
          headerStyle: cellStyles,
        }}
        columns={isAdmin ? adminColumns : workerColumns}
        data={transactions.items}
        detailPanel={(rowData) => <OrderItems items={rowData.order_items} />}
        style={{ backgroundColor: 'transparent' }}
      />
      {canRefund && (
        <Dialog onClose={closeModal} open={showModal}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              if (window.confirm('Are you sure want to refund transaction?')) {
                closeModal();
                Promise.resolve(dispatch(refundAuthorizeTransaction(values))).then(() => {
                  dispatch(fetchTransactions(bookingId));
                }).then(() => {
                  closeModal();
                  actions.resetForm();
                });
              }
            }}
          >
            {(formikProps) => (
              <form onSubmit={formikProps.handleSubmit}>
                <DialogTitle>
                  <Typography variant="h6">
                    Refund #
                    {refundId}
                  </Typography>
                </DialogTitle>
                <DialogContent className={classes.padding}>
                  <FormControl component="fieldset">
                    <FormLabel>Type</FormLabel>
                    <RadioGroup
                      row
                      name="type"
                      value={formikProps.values.type}
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                    >
                      <FormControlLabel value="full" control={<Radio />} label="Full" />
                      <FormControlLabel value="partial" control={<Radio />} label="Partial" />
                    </RadioGroup>
                  </FormControl>
                  {formikProps.values.type === 'partial' && (
                  <TextField
                    className={`${classes.width100} ${classes.mt10} ${classes.mb10}`}
                    name="amount"
                    label="Amount"
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    type="number"
                    value={formikProps.values.amount}
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    error={formikProps.touched.amount && Boolean(formikProps.errors.amount)}
                    helperText={formikProps.touched.amount && formikProps.errors.amount}
                  />
                  )}
                </DialogContent>
                <DialogActions>
                  <RedButton size="small" onClick={closeModal} variant="contained">
                    Cancel
                  </RedButton>
                  <BlueButton variant="contained" size="small" color="primary" type="submit">
                    Save changes
                  </BlueButton>
                </DialogActions>
              </form>
            )}
          </Formik>
        </Dialog>
      )}
    </>
  );
};

export default Transactions;
