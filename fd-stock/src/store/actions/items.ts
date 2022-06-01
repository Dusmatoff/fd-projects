import * as types from '../actionTypes/app';
import * as itemsTypes from '../actionTypes/items';
import {
  ajaxDelete, ajaxGet, ajaxPost, ajaxPut,
} from '../../utils';

export const fetchItems = (isDeleted: number) => async function (dispatch) {
  dispatch({ type: types.SHOW_LOADER });

  try {
    const user = await ajaxGet('stock/items', { isDeleted });

    dispatch({ type: itemsTypes.SET_ITEMS, payload: user });
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};

export const addItem = (data) => async function (dispatch) {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('description', data.description || '');
  formData.append('categoryId', data.categoryId);
  formData.append('orderNumber', data.orderNumber);

  if (data.color) {
    formData.append('color', data.color);
  }

  dispatch({ type: types.SHOW_LOADER });

  try {
    const result = await ajaxPost('stock/items', formData);

    dispatch({ type: types.SHOW_ALERT, payload: result.message });
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};

export const updateItem = (data) => async function (dispatch) {
  const {
    id, name, description, categoryId, color, orderNumber,
  } = data;

  dispatch({ type: types.SHOW_LOADER });

  try {
    const result = await ajaxPut('stock/items', {
      id, name, description, categoryId, color, orderNumber,
    });

    dispatch({ type: types.SHOW_ALERT, payload: result.message });
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};

export const deleteItem = (id) => async function (dispatch) {
  dispatch({ type: types.SHOW_LOADER });

  try {
    const deleteCategory = await ajaxDelete('stock/items', { data: { id } });

    dispatch({ type: types.SHOW_ALERT, payload: deleteCategory.message });
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};
