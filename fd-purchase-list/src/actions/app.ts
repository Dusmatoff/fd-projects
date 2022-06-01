import * as types from '../actionTypes/app';
import { ajaxGet } from '../utils';

export const showLoader = (): Object => ({ type: types.SHOW_LOADER });

export const hideLoader = (): Object => ({ type: types.HIDE_LOADER });

export const showError = (): Object => ({ type: types.SHOW_ERROR });

export const hideError = (): Object => ({ type: types.HIDE_ERROR });

export const showAlert = (message): Object => ({ type: types.SHOW_ALERT, payload: message });

export const hideAlert = (): Object => ({ type: types.HIDE_ALERT });

export const fetchPurchaseLogs = (purchaseId: number) => async function (dispatch) {
  dispatch({ type: types.SHOW_LOADER });

  try {
    const logs = await ajaxGet(`/purchase-list/get-purchase-logs?purchaseId=${purchaseId}`);

    dispatch({ type: types.SET_PURCHASE_LOGS, payload: logs });
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};

export const setEmptyPurchaseLogs = (): object => ({ type: types.SET_PURCHASE_LOGS, payload: [] });

export const setEditPurchase = (purchase: object | null): object => ({ type: types.SET_EDIT_PURCHASE, payload: purchase });
