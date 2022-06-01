import * as transactionsTypes from '../actionTypes/transactions';
import * as types from '../actionTypes/app';
import { ajaxPost, ajaxPostSymfony } from '../utils';

export const fetchTransactions = (id) => {
  const formData = new FormData();
  formData.set('action', 'get_transactions_by_booking_id_react');
  formData.set('id', id);

  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      const transactions = await ajaxPost(formData);

      dispatch({ type: transactionsTypes.SET_TRANSACTIONS, payload: transactions });
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
      throw error.message;
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
};

export const addTransaction = (values) => {
  const formData = new FormData();
  formData.set('action', 'add_transaction_react');
  formData.set('type', values.type);
  formData.set('total', values.cart.total);
  formData.set('shopkeep', values.shopkeep);
  formData.set('shopkeep_txn_id', values.transactionId);
  formData.set('booking_client_id', values.userId);
  formData.set('user_id', values.userId);
  formData.set('user_name', values.userName);
  formData.set('user_email', values.userEmail);
  formData.set('user_phone', values.userPhone);
  formData.set('appointmentid', values.bookingId);

  for (let i = 0; i < values.cart.items.length; i += 1) {
    const product = JSON.stringify(values.cart.items[i]);
    formData.append('products[]', product);
  }

  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      const result = await ajaxPost(formData);

      dispatch({ type: types.SHOW_ALERT, payload: result.message });
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
      throw error.message;
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
};

export const deleteTransaction = (transactionId, bookingId) => {
  const formData = new FormData();
  formData.set('action', 'delete_transaction');
  formData.set('transaction_id', transactionId);
  formData.set('booking_id', bookingId);

  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      await ajaxPost(formData);

      dispatch({ type: types.SHOW_ALERT, payload: 'Transaction deleted' });
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
      throw error.message;
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
};

export const restoreTransaction = (transactionId, bookingId) => {
  const formData = new FormData();
  formData.set('action', 'restore_transaction');
  formData.set('transaction_id', transactionId);
  formData.set('booking_id', bookingId);

  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      await ajaxPost(formData);

      dispatch({ type: types.SHOW_ALERT, payload: 'Transaction restored' });
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
      throw error.message;
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
};

export const chargeAuthorizeTransaction = (id, transactionId, relatedId) => {
  const formData = new FormData();
  formData.set('action', 'charge_authorize_tx');
  formData.set('id', id);
  formData.set('trans_id', transactionId);
  formData.set('related_id', relatedId);

  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      const chargeTx = await ajaxPost(formData);

      if (chargeTx.error) {
        dispatch({ type: types.SHOW_ERROR, payload: chargeTx.error_msg });
      } else {
        dispatch({ type: types.SHOW_ALERT, payload: 'Transaction charged' });
      }
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
      throw error.message;
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
};

export const voidAuthorizeTransaction = (id, transactionId) => {
  const formData = new FormData();
  formData.set('action', 'void_authorize_tx');
  formData.set('id', id);
  formData.set('trans_id', transactionId);

  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      const voidTx = await ajaxPost(formData);

      if (voidTx.error) {
        dispatch({ type: types.SHOW_ERROR, payload: voidTx.error_msg });
      } else {
        dispatch({ type: types.SHOW_ALERT, payload: 'Transaction voided' });
      }
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
      throw error.message;
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
};

export const getErrorInfo = (id) => {
  const formData = new FormData();
  formData.set('action', 'get_error_info');
  formData.set('id', id);

  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      const errorInfo = await ajaxPost(formData);

      if (parseInt(errorInfo, 10) === 0) {
        dispatch({ type: types.SHOW_ALERT, payload: 'Not found error' });
      } else {
        dispatch({ type: types.SHOW_ERROR, payload: errorInfo });
      }
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
      throw error.message;
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
};

export const refundAuthorizeTransaction = (values) => {
  const formData = new FormData();
  formData.set('id', values.refundId);
  formData.set('trans_id', values.refundTransactionId);

  if (values.type === 'full') {
    formData.set('action', 'refund_authorize_tx');
  } else {
    formData.set('action', 'partial_refund_authorize_tx');
    formData.set('refund_amount', values.amount);
  }

  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      const refund = await ajaxPost(formData);

      if (refund.error) {
        dispatch({ type: types.SHOW_ERROR, payload: refund.error_msg });
      } else {
        dispatch({ type: types.SHOW_ALERT, payload: 'Refund done' });
      }
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
      throw error.message;
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
};

export const addAuthorizeTransaction = (values) => {
  const formData = new FormData();
  formData.set('action', 'add_authorize_tx_react');
  formData.set('client_id', values.clientId);
  formData.set('app_id', values.bookingId);
  formData.set('invoice_type', 'authorize_for_appointment');
  formData.set('item_id', values.bookingId);
  formData.set('item_name', 'other');
  formData.set('card_holder', values.cardHolder);
  formData.set('card_number', values.cardNumber);
  formData.set('zip_code', values.zipCode);
  formData.set('expiry_month', values.month);
  formData.set('expiry_year', values.year);
  formData.set('cvv', values.cvc);
  formData.set('category_id', '777');
  formData.set('amount', values.cart.total);

  for (let i = 0; i < values.cart.items.length; i += 1) {
    const product = JSON.stringify(values.cart.items[i]);
    formData.append('products[]', product);
  }

  if (values.useCard) {
    formData.set('use_saved', '1');
  } else if (values.saveCard) {
    const saveCard = values.saveCard ? '1' : '0';
    formData.set('save_card', saveCard);
  } else {
    const updateCard = values.updateCard ? '1' : '0';
    formData.set('update_card', updateCard);
  }

  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      const addTx = await ajaxPost(formData);

      if (addTx.error) {
        dispatch({ type: types.SHOW_ERROR, payload: addTx.error_msg });
      } else {
        dispatch({ type: types.SHOW_ALERT, payload: 'Transaction added' });
      }
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
      throw error.message;
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
};

export const addRefund = (fields: object) => {
  const formData = new FormData();

  for (const key in fields) {
    formData.append(key, fields[key]);
  }

  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      const result = await ajaxPostSymfony('refund-requests', formData);

      dispatch({ type: types.SHOW_ALERT, payload: result.message });
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
};

export const deleteClientCard = (values) => {
  const formData = new FormData();
  formData.set('action', 'delete_client_card_react');
  formData.set('client_id', values.clientId);
  formData.set('app_id', values.bookingId);

  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      const deleteCard = await ajaxPost(formData);

      if (deleteCard.error) {
        dispatch({ type: types.SHOW_ERROR, payload: deleteCard.error_msg });
      } else {
        dispatch({ type: types.SHOW_ALERT, payload: 'Card successfully deleted' });
      }
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
      throw error.message;
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
};
