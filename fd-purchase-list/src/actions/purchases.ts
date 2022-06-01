import * as types from '../actionTypes/app';
import * as purchasesTypes from '../actionTypes/purchases';
import {
  ajaxDelete, ajaxGet, ajaxPost, ajaxPut,
} from '../utils';

export function fetchPurchases() {
  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      const purchases = await ajaxGet('purchase-list/purchases');

      dispatch({ type: purchasesTypes.SET_PURCHASES, payload: purchases });
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
}

export const addPurchase = (fields: object, userId: string) => async function (dispatch) {
  dispatch({ type: types.SHOW_LOADER });

  const formData = new FormData();
  formData.append('userId', userId);

  for (const key in fields) {
    formData.append(key, fields[key]);
  }

  try {
    const result = await ajaxPost('purchase-list/purchases', formData);

    dispatch({ type: types.SHOW_ALERT, payload: result.message });
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};

export const updatePurchase = (fields: object) => async function (dispatch) {
  dispatch({ type: types.SHOW_LOADER });

  try {
    const result = await ajaxPut('purchase-list/purchases', fields);

    dispatch({ type: types.SHOW_ALERT, payload: result.message });
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};

export const deletePurchase = (id: number) => async function (dispatch) {
  dispatch({ type: types.SHOW_LOADER });

  try {
    const result = await ajaxDelete('purchase-list/purchases', { data: { id } });

    dispatch({ type: types.SHOW_ALERT, payload: result.message });
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};

export const addDebitAndCredit = (fields: object) => async function (dispatch) {
  dispatch({ type: types.SHOW_LOADER });

  const formData = new FormData();

  for (const key in fields) {
    formData.append(key, fields[key]);
  }

  try {
    const result = await ajaxPost('debit-and-credit', formData);

    dispatch({ type: types.SHOW_ALERT, payload: result.message });
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};

export function fetchSinglePurchase(id: string) {
  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      const singlePurchase = await ajaxGet(`purchase-list/purchase/${id}`);

      dispatch({ type: types.SET_EDIT_PURCHASE, payload: singlePurchase[0] });
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
}
