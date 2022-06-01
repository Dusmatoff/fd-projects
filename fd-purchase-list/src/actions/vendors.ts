import * as types from '../actionTypes/app';
import * as vendorTypes from '../actionTypes/vendors';
import {
  ajaxDelete, ajaxGet, ajaxPost, ajaxPut,
} from '../utils';

export function fetchVendors() {
  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      const vendors = await ajaxGet('purchase-list/vendors');

      dispatch({ type: vendorTypes.SET_VENDORS, payload: vendors });
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
}

export const addVendor = (name: string) => {
  const formData = new FormData();
  formData.append('name', name);

  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      const result = await ajaxPost('purchase-list/vendors', formData);

      dispatch({ type: types.SHOW_ALERT, payload: result.message });
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
};

export const updateVendor = (id: number, name: string) => async function (dispatch) {
  dispatch({ type: types.SHOW_LOADER });

  try {
    const result = await ajaxPut('purchase-list/vendors', { id, name });

    dispatch({ type: types.SHOW_ALERT, payload: result.message });
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};

export const deleteVendor = (id: number) => async function (dispatch) {
  dispatch({ type: types.SHOW_LOADER });

  try {
    const result = await ajaxDelete('purchase-list/vendors', { data: { id } });

    dispatch({ type: types.SHOW_ALERT, payload: result.message });
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};
