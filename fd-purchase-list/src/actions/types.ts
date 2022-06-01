import * as types from '../actionTypes/app';
import * as catTypes from '../actionTypes/types';
import {
  ajaxDelete, ajaxGet, ajaxPost, ajaxPut,
} from '../utils';

export function fetchTypes() {
  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      const result = await ajaxGet('purchase-list/types');

      dispatch({ type: catTypes.SET_TYPES, payload: result });
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
}

export const addType = (categoryId: string, name: string) => {
  const formData = new FormData();
  formData.append('categoryId', categoryId);
  formData.append('name', name);

  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      const result = await ajaxPost('purchase-list/types', formData);

      dispatch({
        type: types.SHOW_ALERT,
        payload: result.message,
      });
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
};

export const updateType = (id: number, categoryId: number, name: string) => async function (dispatch) {
  dispatch({ type: types.SHOW_LOADER });

  try {
    const result = await ajaxPut('purchase-list/types', { id, categoryId, name });

    dispatch({
      type: types.SHOW_ALERT,
      payload: result.message,
    });
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};

export const deleteType = (id: number) => async function (dispatch) {
  dispatch({ type: types.SHOW_LOADER });

  try {
    const result = await ajaxDelete('purchase-list/types', { data: { id } });

    dispatch({
      type: types.SHOW_ALERT,
      payload: result.message,
    });
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};
