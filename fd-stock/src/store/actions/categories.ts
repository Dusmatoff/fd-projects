import * as types from '../actionTypes/app';
import * as categoryTypes from '../actionTypes/categories';
import {
  ajaxGet, ajaxPost, ajaxDelete, ajaxPut,
} from '../../utils';

export const fetchCategories = () => async function (dispatch) {
  dispatch({ type: types.SHOW_LOADER });

  try {
    const user = await ajaxGet('stock/categories');

    dispatch({ type: categoryTypes.SET_CATEGORIES, payload: user });
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};

export const addCategory = (data) => async function (dispatch) {
  const formData = new FormData();
  formData.append('name', data.name);
  if (data.description) {
    formData.append('description', data.description);
  }

  dispatch({ type: types.SHOW_LOADER });

  try {
    const result = await ajaxPost('stock/categories', formData);

    dispatch({ type: types.SHOW_ALERT, payload: result.message });
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};

export const updateCategory = (data) => async function (dispatch) {
  const { id, name, description } = data;

  dispatch({ type: types.SHOW_LOADER });

  try {
    const result = await ajaxPut('stock/categories', { id, name, description });

    dispatch({ type: types.SHOW_ALERT, payload: result.message });
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};

export const deleteCategory = (id) => async function (dispatch) {
  dispatch({ type: types.SHOW_LOADER });

  try {
    const deleteCategory = await ajaxDelete('stock/categories', { data: { id } });

    dispatch({ type: types.SHOW_ALERT, payload: deleteCategory.message });
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};
